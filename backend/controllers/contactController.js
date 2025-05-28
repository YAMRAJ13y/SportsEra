const ContactMessage = require('../models/ContactMessage');
const sendEmail = require('../utils/sendEmail');

// Create contact message
exports.createContactMessage = async (req, res) => {
  try {
    const { email, subject, message } = req.body;

    const contactMessage = await ContactMessage.create({
      user: req.user ? req.user.id : null,
      email,
      subject,
      message
    });

    // Send notification to admin
    try {
      await sendEmail({
        email: process.env.EMAIL_USER, // Admin email
        subject: `New Contact Message - ${subject}`,
        html: `
          <h2>New Contact Message</h2>
          <p><strong>From:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
          <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
        `
      });
    } catch (emailError) {
      console.error('Admin notification email failed:', emailError);
    }

    res.status(201).json({
      success: true,
      message: 'Message sent successfully. We will get back to you soon.',
      data: { contactMessage }
    });
  } catch (error) {
    console.error('Create contact message error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message',
      error: error.message
    });
  }
};

// Get all contact messages (Admin only)
exports.getContactMessages = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const { status, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;

    // Build filter object
    const filter = {};
    if (status && status !== 'all') {
      filter.status = status;
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const messages = await ContactMessage.find(filter)
      .populate('user', 'fullName profilePicture')
      .populate('repliedBy', 'fullName')
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await ContactMessage.countDocuments(filter);

    res.json({
      success: true,
      data: {
        messages,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalMessages: total,
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1
        }
      }
    });
  } catch (error) {
    console.error('Get contact messages error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contact messages',
      error: error.message
    });
  }
};

// Get single contact message (Admin only)
exports.getContactMessage = async (req, res) => {
  try {
    const message = await ContactMessage.findById(req.params.id)
      .populate('user', 'fullName profilePicture email')
      .populate('repliedBy', 'fullName');

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }

    res.json({
      success: true,
      data: { message }
    });
  } catch (error) {
    console.error('Get contact message error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contact message',
      error: error.message
    });
  }
};

// Reply to contact message (Admin only)
exports.replyToMessage = async (req, res) => {
  try {
    const { reply } = req.body;
    
    const message = await ContactMessage.findById(req.params.id)
      .populate('user', 'fullName email');

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }

    message.adminReply = reply;
    message.status = 'closed';
    message.repliedBy = req.user.id;
    message.repliedAt = new Date();

    await message.save();

    // Send reply email to user
    try {
      await sendEmail({
        email: message.email,
        subject: `Re: ${message.subject}`,
        html: `
          <h2>Reply to Your Message</h2>
          <p>Dear ${message.user ? message.user.fullName : 'User'},</p>
          <p>Thank you for contacting us. Here is our response to your message:</p>
          
          <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #007bff; margin: 20px 0;">
            <p><strong>Your Original Message:</strong></p>
            <p>${message.message}</p>
          </div>
          
          <div style="background-color: #e8f5e8; padding: 15px; border-left: 4px solid #28a745; margin: 20px 0;">
            <p><strong>Our Response:</strong></p>
            <p>${reply}</p>
          </div>
          
          <p>If you have any further questions, please don't hesitate to contact us.</p>
          <p>Best regards,<br>SportsEra Team</p>
        `
      });
    } catch (emailError) {
      console.error('Reply email failed:', emailError);
    }

    res.json({
      success: true,
      message: 'Reply sent successfully',
      data: { message }
    });
  } catch (error) {
    console.error('Reply to message error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send reply',
      error: error.message
    });
  }
};

// Update message status (Admin only)
exports.updateMessageStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!['open', 'in-progress', 'closed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    const message = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }

    res.json({
      success: true,
      message: 'Status updated successfully',
      data: { message }
    });
  } catch (error) {
    console.error('Update message status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update status',
      error: error.message
    });
  }
};

// Delete contact message (Admin only)
exports.deleteContactMessage = async (req, res) => {
  try {
    const message = await ContactMessage.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }

    res.json({
      success: true,
      message: 'Contact message deleted successfully'
    });
  } catch (error) {
    console.error('Delete contact message error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete contact message',
      error: error.message
    });
  }
};

// Get user's contact messages
exports.getUserMessages = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    const messages = await ContactMessage.find({ user: req.user.id })
      .populate('repliedBy', 'fullName')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: { messages }
    });
  } catch (error) {
    console.error('Get user messages error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch your messages',
      error: error.message
    });
  }
};