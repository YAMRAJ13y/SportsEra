const Event = require('../models/Event');
const { uploadImage } = require('../utils/uploadImage');
const sendEmail = require('../utils/sendEmail');

// Get all events with pagination and filters
exports.getEvents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const { sportCategory, location, upcoming, sortBy = 'dateTime', sortOrder = 'asc' } = req.query;

    // Build filter object
    const filter = { isActive: true };
    
    if (sportCategory && sportCategory !== 'all') {
      filter.sportCategory = sportCategory;
    }
    
    if (location) {
      filter.location = { $regex: location, $options: 'i' };
    }
    
    if (upcoming === 'true') {
      filter.dateTime = { $gte: new Date() };
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const events = await Event.find(filter)
      .populate('createdBy', 'fullName profilePicture')
      .populate('participants.user', 'fullName profilePicture email')
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await Event.countDocuments(filter);

    // Add user-specific data if authenticated
    const eventsWithUserData = events.map(event => {
      const eventObj = event.toObject();
      if (req.user) {
        const userParticipation = event.participants.find(
          p => p.user._id.toString() === req.user.id
        );
        eventObj.userParticipationStatus = userParticipation ? userParticipation.status : null;
      }
      return eventObj;
    });

    res.json({
      success: true,
      data: {
        events: eventsWithUserData,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalEvents: total,
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1
        }
      }
    });
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch events',
      error: error.message
    });
  }
};

// Get single event
exports.getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('createdBy', 'fullName profilePicture bio')
      .populate('participants.user', 'fullName profilePicture email');

    if (!event || !event.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    const eventObj = event.toObject();
    if (req.user) {
      const userParticipation = event.participants.find(
        p => p.user._id.toString() === req.user.id
      );
      eventObj.userParticipationStatus = userParticipation ? userParticipation.status : null;
    }

    res.json({
      success: true,
      data: { event: eventObj }
    });
  } catch (error) {
    console.error('Get event error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch event',
      error: error.message
    });
  }
};

// Create new event (Admin only)
exports.createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      sportCategory,
      location,
      dateTime,
      maxParticipants,
      entryFee,
      prizeMoney
    } = req.body;

    // Handle image upload
    let eventImage = null;
    if (req.files && req.files.eventImage) {
      const uploadResult = await uploadImage(req.files.eventImage, 'sportsera/events');
      eventImage = uploadResult.url;
    }

    const event = await Event.create({
      title,
      description,
      sportCategory,
      location,
      dateTime,
      maxParticipants,
      entryFee,
      prizeMoney,
      eventImage,
      createdBy: req.user.id
    });

    await event.populate('createdBy', 'fullName profilePicture');

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      data: { event }
    });
  } catch (error) {
    console.error('Create event error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create event',
      error: error.message
    });
  }
};

// Update event (Admin only)
exports.updateEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      sportCategory,
      location,
      dateTime,
      maxParticipants,
      entryFee,
      prizeMoney
    } = req.body;
    
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    const updateData = {
      title,
      description,
      sportCategory,
      location,
      dateTime,
      maxParticipants,
      entryFee,
      prizeMoney
    };

    // Handle image upload
    if (req.files && req.files.eventImage) {
      const uploadResult = await uploadImage(req.files.eventImage, 'sportsera/events');
      updateData.eventImage = uploadResult.url;
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('createdBy', 'fullName profilePicture');

    res.json({
      success: true,
      message: 'Event updated successfully',
      data: { event: updatedEvent }
    });
  } catch (error) {
    console.error('Update event error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update event',
      error: error.message
    });
  }
};

// Delete event (Admin only)
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    // Soft delete
    event.isActive = false;
    await event.save();

    res.json({
      success: true,
      message: 'Event deleted successfully'
    });
  } catch (error) {
    console.error('Delete event error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete event',
      error: error.message
    });
  }
};

// Apply for event
exports.applyForEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event || !event.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    // Check if event is in the past
    if (event.dateTime < new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Cannot apply for past events'
      });
    }

    // Check if event is full
    if (event.approvedParticipantsCount >= event.maxParticipants) {
      return res.status(400).json({
        success: false,
        message: 'Event is full'
      });
    }

    // Check if user already applied
    const existingParticipation = event.participants.find(
      p => p.user.toString() === req.user.id
    );

    if (existingParticipation) {
      return res.status(400).json({
        success: false,
        message: 'You have already applied for this event'
      });
    }

    // Add user to participants
    event.participants.push({
      user: req.user.id,
      status: 'pending'
    });

    await event.save();

    res.json({
      success: true,
      message: 'Application submitted successfully. Waiting for admin approval.'
    });
  } catch (error) {
    console.error('Apply for event error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to apply for event',
      error: error.message
    });
  }
};

// Withdraw from event
exports.withdrawFromEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event || !event.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    // Find user's participation
    const participationIndex = event.participants.findIndex(
      p => p.user.toString() === req.user.id
    );

    if (participationIndex === -1) {
      return res.status(400).json({
        success: false,
        message: 'You have not applied for this event'
      });
    }

    // Remove user from participants
    event.participants.splice(participationIndex, 1);
    await event.save();

    res.json({
      success: true,
      message: 'Successfully withdrawn from event'
    });
  } catch (error) {
    console.error('Withdraw from event error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to withdraw from event',
      error: error.message
    });
  }
};

// Manage participant status (Admin only)
exports.manageParticipant = async (req, res) => {
  try {
    const { status } = req.body; // 'approved' or 'rejected'
    const { id: eventId, participantId } = req.params;

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be approved or rejected'
      });
    }

    const event = await Event.findById(eventId)
      .populate('participants.user', 'fullName email');
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    const participant = event.participants.id(participantId);
    
    if (!participant) {
      return res.status(404).json({
        success: false,
        message: 'Participant not found'
      });
    }

    // Check if approving would exceed max participants
    if (status === 'approved' && event.approvedParticipantsCount >= event.maxParticipants) {
      return res.status(400).json({
        success: false,
        message: 'Event is already full'
      });
    }

    participant.status = status;
    await event.save();

    // Send notification email
    try {
      const emailSubject = status === 'approved' 
        ? `Event Application Approved - ${event.title}`
        : `Event Application Rejected - ${event.title}`;
      
      const emailMessage = status === 'approved'
        ? `Congratulations! Your application for "${event.title}" has been approved.`
        : `We regret to inform you that your application for "${event.title}" has been rejected.`;

      await sendEmail({
        email: participant.user.email,
        subject: emailSubject,
        html: `
          <h2>${emailSubject}</h2>
          <p>Dear ${participant.user.fullName},</p>
          <p>${emailMessage}</p>
          <p>Event Details:</p>
          <ul>
            <li>Title: ${event.title}</li>
            <li>Date: ${new Date(event.dateTime).toLocaleDateString()}</li>
            <li>Location: ${event.location}</li>
          </ul>
          <p>Best regards,<br>SportsEra Team</p>
        `
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
    }

    res.json({
      success: true,
      message: `Participant ${status} successfully`
    });
  } catch (error) {
    console.error('Manage participant error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to manage participant',
      error: error.message
    });
  }
};

// Get user's events
exports.getUserEvents = async (req, res) => {
  try {
    const { status } = req.query; // 'pending', 'approved', 'rejected', or 'all'
    
    const filter = {
      'participants.user': req.user.id,
      isActive: true
    };

    if (status && status !== 'all') {
      filter['participants.status'] = status;
    }

    const events = await Event.find(filter)
      .populate('createdBy', 'fullName profilePicture')
      .sort({ dateTime: 1 });

    // Filter and add user-specific data
    const userEvents = events.map(event => {
      const eventObj = event.toObject();
      const userParticipation = event.participants.find(
        p => p.user.toString() === req.user.id
      );
      eventObj.userParticipationStatus = userParticipation ? userParticipation.status : null;
      eventObj.appliedAt = userParticipation ? userParticipation.appliedAt : null;
      return eventObj;
    }).filter(event => {
      if (status && status !== 'all') {
        return event.userParticipationStatus === status;
      }
      return true;
    });

    res.json({
      success: true,
      data: { events: userEvents }
    });
  } catch (error) {
    console.error('Get user events error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user events',
      error: error.message
    });
  }
};