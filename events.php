<?php 
include "header.php"; 

date_default_timezone_set('Asia/Kolkata'); // Set your timezone

include "connection.php";
if(isset($_REQUEST['apply_event'])){
    error_reporting(1);
    extract($_POST);
    $eventQuery = "insert into event_users(user_id,event_id,status) values($id,$eventId,'pending')";
    mysqli_query($connect,$eventQuery);
    header('Location: ' . $_SERVER['REQUEST_URI']);
    exit();
}

?>
<div>
    <div class="continer mx-5 mt-3">
        <h2 class="mx-4 mb-4 ">Events</h2>
        <div class="row gap-4 mb-5">
            <?php
            error_reporting(1);
                include "connection.php";
                $eventQuery = "SELECT 
                    e.*, 
                    CASE 
                        WHEN eu.user_id IS NOT NULL AND eu.status = 'approved' AND eu.user_id=$id THEN 'Success'
                        WHEN eu.user_id IS NOT NULL AND eu.status = 'reject' AND eu.user_id=$id THEN 'Reject'
                        WHEN eu.user_id IS NOT NULL AND eu.user_id=$id THEN 'Pending'
                        ELSE ''
                    END AS user_status,
                    COUNT(CASE WHEN eu.status = 'approved' THEN 1 END) AS total_success
                FROM 
                    events e
                LEFT JOIN 
                    event_users eu ON e.id = eu.event_id
                GROUP BY 
                    e.id
                ORDER BY e.id DESC
                ";
                $row = mysqli_query($connect,$eventQuery);
                $currentTimestamp = strtotime(date('Y-m-d H:i:s')); // Current timestamp
                while($data = mysqli_fetch_array($row)){
                    $eventTimestamp = strtotime($data['start_date'] . ' ' . $data['start_time']);
            ?>
            <div class="col-10 mx-auto border shadow ">
                <div class='d-flex justify-contect-center align-items-center gap-2 py-3'>
                    <div class="d-flex align-items-center w-50">
                        <img src='upload/<?php echo $data['image']; ?>' />
                    </div>
                    <div class='row px-4 pm w-100'>
                        <div class="col-3">
                            <div>
                                <h6>Event Name</h6>
                                <p style='color:gray;font-size:14px;'><?php echo $data['event_name']; ?></p>
                            </div>
                        </div>
                        <div class="col-3">
                            <div>
                                <h6>Event Category</h6>
                                <p style='color:gray;font-size:14px;'><?php echo $data['event_category']; ?></p>
                            </div>
                        </div>
                        <div class="col-3">
                            <div>
                                <h6>Event Venues</h6>
                                <p style='color:gray;font-size:14px;'><?php echo $data['event_venues']; ?></p>
                            </div>
                        </div>
                        <div class="col-3">
                            <div>
                                <h6>Total Player</h6>
                                <p style='color:gray;font-size:14px;'><?php echo $data['total_player']; ?></p>
                            </div>
                        </div>
                        <div class="col-3">
                            <div>
                                <h6>Entry Price</h6>
                                <p style='color:gray;font-size:14px;'><?php echo $data['price']; ?></p>
                            </div>
                        </div>
                        <div class="col-3">
                            <div>
                                <h6>Win Price</h6>
                                <p style='color:gray;font-size:14px;'><?php echo $data['win_price']; ?></p>
                            </div>
                        </div>
                        <div class="col-3">
                            <div>
                                <h6>Start Date</h6>
                                <p style='color:gray;font-size:14px;'><?php echo $data['start_date']; ?></p>
                            </div>
                        </div>
                        <div class="col-3">
                            <div>
                                <h6>Start Time</h6>
                                <p style='color:gray;font-size:14px;'><?php echo $data['start_time']; ?></p>
                            </div>
                        </div>
                    </div>
                    <form method='post' class='flex-glow w-25 d-flex justify-contect-center align-items-center'>
                        <input type='text' value='<?php echo $data['id']; ?>' style='display:none;' name='eventId' />
                        <?php if ($eventTimestamp < $currentTimestamp) { ?>
                        <span class="badge-danger">Event is over now !</span>
                        <?php }else if($data['total_success'] >= $data['total_player']){
                            ?>
                        <span class="badge-danger">Event sloat is fully !</span>
                        <?php
                        }else if($data['user_status'] == "Success") {
                            ?>
                        <span class="badge-success">Approved !</span>
                        <?php 
                        } else if($data['user_status'] == "Pending") {
                            ?>
                        <span class="badge-warn">Wait for admin approve !</span>
                        <?php 
                        } else{
                            ?>
                        <button type="submit" name='apply_event' class="btn btn-secondary">Apply For Event</button>
                        <?php
                         }?>
                    </form>
                </div>
            </div>
            <?php } ?>
        </div>
    </div>
</div>

<?php include "footer.php"; ?>