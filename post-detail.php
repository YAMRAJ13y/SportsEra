<?php include "header.php"; ?>
<?php 
    
    include "connection.php";
    $requestId = $_REQUEST['id'];
    if(isset($_REQUEST['comment'])){
            extract($_POST);
            $commentInsertQuery= "insert into posts_comment(user_id,post_id,comment) values($id,$requestId,'$commentText')";
            mysqli_query($connect,$commentInsertQuery);
            header('Location: ' . $_SERVER['REQUEST_URI']);
            exit();
    }

    if(isset($_REQUEST['like'])){
        extract($_POST);
        $queryForLike = "select * from like_posts where user_id=$id and post_id=$requestId";
        $isLikeExisit = mysqli_query($connect,$queryForLike);
        if(mysqli_fetch_array($isLikeExisit)){
            mysqli_query($connect,"delete from like_posts where user_Id=$id and post_id=$requestId");
        }else{
            $q1 = "insert into like_posts(user_id,post_id) values($id,$requestId)";
            mysqli_query($connect,$q1);
        }
        header('Location: ' . $_SERVER['REQUEST_URI']);
        exit();
    }

    $postQuery = "SELECT 
        p.*, 
        COUNT(lp.post_id) AS total_likes,
        CASE 
            WHEN EXISTS (
                SELECT 1
                FROM like_posts lp_inner
                WHERE lp_inner.post_id = p.id AND lp_inner.user_id = $id
            ) THEN 1
            ELSE 0
        END AS user_liked
    FROM 
        posts p
    LEFT JOIN 
        like_posts lp ON p.id = lp.post_id
    WHERE 
        p.id = $requestId
    GROUP BY 
        p.id
    ";
    $row= mysqli_query($connect,$postQuery);
    $data = mysqli_fetch_array($row);
?>
<div>
    <div class="continer mx-5 mt-3">
        <h2  class="mx-4 mb-4 ">Post Detail</h2>

        <div class='d-flex flex-column w-50 mx-auto gap-3'>
            <div class='post-image-detail'>
                <img src='upload/<?php echo $data['image']; ?>' />
            </div>
            <div class="post-header-detail ">
                <div class='d-flex align-items-center'>
                    <img src="upload/<?php echo $user['profilePicture']; ?>" alt="User Avatar" class="avatar">
                    <div class="user-info">
                      <h4><?php echo $user['fullName']; ?></h4>
                     
      
                      <p><?php echo ($data['created_at']); ?></p>
                    </div>
                </div>
                <div class='d-flex align-items-center'>
                <form class="post-actions-details" method='post'>
                    <button type='submit' name='like' ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="<?php echo $data['user_liked'] == 1 ? "#FF0000" :"none";  ?>" stroke="<?php echo $data['user_liked'] == 1 ? "#FF0000" :"currentColor";  ?>" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg> <?php echo $data['total_likes']; ?>  Like</button>
                 </form>
                </div>
            </div>
            <div class='first-letter'>
                <?php echo $data['description']; ?>
            </div>
            <div>
            <h3  class="mx-4 mb-4 ">Comments</h3>
            <?php 
                    $commentSelectQuery = "SELECT 
                    c.id AS comment_id,
                    c.comment,
                    c.created_at AS comment_created_at,
                    u.id AS user_id,
                    u.fullName AS user_name,  -- Adjust the column names as per your `users` table structure
                    u.email AS user_email,
                    u.profilePicture AS user_image
                FROM 
                posts_comment c
                JOIN 
                    users u ON c.user_id = u.id  -- Join the comments table with the users table based on user_id
                WHERE 
                    c.post_id = $requestId  -- Optionally filter by post_id if you want to fetch comments for a specific post
                ";
                $rowCommentData = mysqli_query($connect,$commentSelectQuery);
                while($data= mysqli_fetch_array($rowCommentData)){
             ?>
            <div>
            <div class="post-header-detail ">
                <div class='d-flex align-items-center'>
                    <img src="upload/<?php echo $data['user_image']; ?>" alt="User Avatar" class="avatar">
                    <div class="user-info">
                      <h4><?php echo $data['user_name']; ?></h4>
                      <p><?php echo $data['comment']; ?></p>
                     
                    </div>
                </div>
            </div>
            </div>
            <?php } ?>
            <form class='d-flex  align-items-center gap-3 mb-5' method='post'>
            <div class="w-100">
                <input type="text" class="form-control w-100" id="signup-email" placeholder="Reaply as comment....!"  name='commentText' required>
            </div>
            <button type="submit" name='comment' class="btn btn-primary">Send</button>
            </form>  
    </div>
</div>

