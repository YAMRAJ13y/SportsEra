<!-- Sidebar -->
<?php
error_reporting(0);
  session_start();
  if(!$_SESSION['admin']) {
      header("location:login.php");
  }

  
 ?>
<ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
    <!-- Sidebar - Brand -->
    <a class="sidebar-brand d-flex align-items-center justify-content-center" href="#">
        <div class="sidebar-brand-icon rotate-n-15">
            <i class="fas fa-volleyball-ball"></i>
            <!-- <i class="fas fa-baseball-ball"></i> -->
        </div>
        <div class="sidebar-brand-text mx-3">Sport Admin</div>
    </a>

    <!-- Divider -->
    <hr class="sidebar-divider my-0" />

    <!-- Nav Item - Dashboard -->
    <li class="nav-item">
        <a class="nav-link" href='index.php'>
            <i class="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span></a>

    </li>

    <!-- Divider -->
    <hr class="sidebar-divider" />

    <!-- Nav Item - Pages Collapse Menu -->
    <li class="nav-item">
        <a class="nav-link collapsed" href="user.php" aria-expanded="true" aria-controls="collapseTwo">
            <i class="fas fa-user"></i>
            <span>Users</span>
        </a>
    <li class="nav-item">
        <a class="nav-link" href="event.php" aria-expanded="true" aria-controls="collapseTwo">
            <i class="fas fa-calendar"></i>
            <span>Event</span>
        </a>
        <a class="nav-link" href="event-user.php" aria-expanded="true" aria-controls="collapseTwo">
        <i class="fas fa-user"></i>    
           <span>Event Users</span>

        </a>
        <!-- <div
            id="collapseTwo"
            class="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordionSidebar"
          >
            <div class="bg-white py-2 collapse-inner rounded">
              <h6 class="collapse-header">Custom Components:</h6>
              <a class="collapse-item" href="buttons.html">Buttons</a>
              <a class="collapse-item" href="cards.html">Cards</a>
            </div>
          </div> -->
    </li>

    <!-- Nav Item - Utilities Collapse Menu -->
    <li class="nav-item">
        <a class="nav-link collapsed" href="contact-user.php" aria-expanded="true" aria-controls="collapseUtilities">
            <i class="fas fa-address-book"></i>
            <span>Contact users</span>
        </a>

        <a class="nav-link collapsed" href="logout.php" aria-expanded="true" aria-controls="collapseUtilities">
            <i class="fas fa-sign-out-alt"></i>
            <span>Logout</span>
        </a>
<!--         
    <div>
        <button> Logout</button>
    </div> -->

    </li>

    <!-- Divider -->

    <!-- Nav Item - Pages Collapse Menu
    <li class="nav-item">
        <a class="nav-link collapsed" href="#" aria-expanded="true" aria-controls="collapsePages">
            <i class="fas fa-comments"></i>
            <span>Comments</span>
        </a>
    </li> -->

    <!-- Nav Item - Charts -->
    <!-- <li class="nav-item">
          <a class="nav-link" href="charts.html">
            <i class="fas fa-fw fa-chart-area"></i>
            <span>Charts</span></a
          >
        </li> -->

    <!-- Nav Item - Tables -->
    <!-- <li class="nav-item">
          <a class="nav-link" href="tables.html">
            <i class="fas fa-fw fa-table"></i>
            <span>Tables</span></a
          >
        </li> -->

    <!-- Divider -->
    <hr class="sidebar-divider d-none d-md-block" />

    <!-- Sidebar Toggler (Sidebar) -->
    <div class="text-center d-none d-md-inline">
        <button class="rounded-circle border-0" id="sidebarToggle"></button>
    </div>

</ul>
<!-- End of Sidebar -->

<!-- Content Wrapper -->