<?php include "header.php"; ?>
<?php 
    
    include "connection.php";
    if(isset($_REQUEST['like'])){
            extract($_POST);
            $queryForLike = "select * from like_posts where user_id=$id and post_id=$postId";
            $isLikeExisit = mysqli_query($connect,$queryForLike);
            if(mysqli_fetch_array($isLikeExisit)){
                mysqli_query($connect,"delete from like_posts where user_Id=$id and post_id=$postId");
            }else{
                $q1 = "insert into like_posts(user_id,post_id) values($id,$postId)";
                mysqli_query($connect,$q1);
            }
            header('Location: ' . $_SERVER['REQUEST_URI']);
            exit();
    }

?>
<div>
    <div class="continer mx-5 mt-3">
        <h2 class="mx-4 mb-4 ">Posts</h2>
        <div class="row">
            <?php
            
            $postQuery = "SELECT 
                p.id AS post_id,
                p.title,
                p.description,
                p.created_at,
                p.user_id,
                p.image,
                COUNT(lp.post_id) AS like_count,
                COUNT(cp.post_id) AS comment_count,
                CASE 
                    WHEN EXISTS (
                        SELECT 1 
                        FROM like_posts lp_inner 
                        WHERE lp_inner.post_id = p.id AND lp_inner.user_id = $id
                    ) THEN 1
                    ELSE 0
                END AS is_liked_by_user,
                u.id AS user_id,
                u.fullName AS user_name,  
                u.email AS user_email,
                u.profilePicture AS user_image 
            FROM 
                posts p
            LEFT JOIN 
                like_posts lp ON p.id = lp.post_id
            LEFT JOIN 
            posts_comment cp ON p.id = cp.post_id
            LEFT JOIN 
                users u ON p.user_id = u.id  -- Joining the users table to fetch user details
            GROUP BY 
                p.id
            ORDER BY 
                p.id DESC;
            ";

        $row = mysqli_query($connect,$postQuery);
        
        while($data=mysqli_fetch_array($row)){
            ?>
            <div class='col-3'>
                <form method='post'>
                    <div class="post-list">
                        <!-- Post 1 -->
                        <div class="post">
                            <div class="post-header">
                                <img src="upload/<?php echo $data['user_image']; ?>" alt="User Avatar" class="avatar">
                                <div class="user-info">
                                    <h4><?php echo $data['user_name']; ?></h4>


                                    <p><?php echo ($data['created_at']); ?></p>
                                </div>
                            </div>
                            <div class="post-media">
                                <a href="post-detail.php?id=<?php echo $data['post_id']; ?>">
                                    <img src="upload/<?php echo $data['image']; ?>" alt="Post Media">
                                </a>
                            </div>
                            <div class="post-content">
                                <p><?php echo $data['description']; ?></p>
                            </div>
                            <input type='text' style='display:none;' value='<?php echo $data['post_id']; ?>'
                                name='postId' />
                            <div class="post-actions">
                                <?php
                                $id = $data['post_id'];
                                    $countQuery = "select count(*) as totalCount from like_posts where post_id=$id";
                                    $row2 = mysqli_query($connect,$countQuery);
                                    $counrData = mysqli_fetch_array($row2);
                                    $countCommentQuery = "select count(*) as totalCount from posts_comment where post_id=$id";
                                    $row3 = mysqli_query($connect,$countCommentQuery);
                                    $countCommentData = mysqli_fetch_array($row3);
                                ?>
                                <button type='submit' name='like'><svg xmlns="http://www.w3.org/2000/svg" width="24"
                                        height="24" viewBox="0 0 24 24"
                                        fill="<?php echo $data['is_liked_by_user'] == 1 ? "#FF0000" :"none";  ?>"
                                        stroke="<?php echo $data['is_liked_by_user'] == 1 ? "#FF0000" :"currentColor";  ?>"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                        class="lucide lucide-heart">
                                        <path
                                            d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                                    </svg> <?php echo $counrData['totalCount']; ?> Like</button>
                                <button><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round"
                                        class="lucide lucide-message-circle">
                                        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                                    </svg><?php echo $countCommentData['totalCount']; ?> Comment</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <?php
        }
            
            ?>
        </div>
    </div>
</div>
<?php include "footer.php"; ?>