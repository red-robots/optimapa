<!DOCTYPE html>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>" />
<meta name="viewport" content="width=device-width" />
<title>
<?php 
if(is_home()) { bloginfo('name'); } else {
wp_title( '|', true, 'right' ); }?>
</title>
<link rel="profile" href="http://gmpg.org/xfn/11" />
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />



<link rel="stylesheet" type="text/css" media="all" href="<?php bloginfo( 'stylesheet_url' ); ?>?ver=0125" />
<link rel="stylesheet" href="<?php bloginfo( 'template_url' ); ?>/css/basic.css" type="text/css" />
<link rel="stylesheet" href="<?php bloginfo( 'template_url' ); ?>/css/galleriffic-5.css" type="text/css" />
<link href='https://fonts.googleapis.com/css?family=Raleway:400,300' rel='stylesheet' type='text/css'>








<?php wp_head(); ?>




</head>

<body>


<div id="main">
  <div id="masthead">
    <div class="wrapper">
      <div class="col-1">
        <?php if(is_front_page()) { ?>
          <h1 class="logo">
            <a href="<?php bloginfo('url'); ?>"><img src="<?php echo get_template_directory_uri()."/images/logo.svg";?>" alt="Optima Engineering"></a> 
          </h1>
        <?php } else { ?>
          <div class="logo">
            <a href="<?php bloginfo('url'); ?>"><img src="<?php echo get_template_directory_uri()."/images/logo.svg";?>" alt="Optima Engineering"></a> 
          </div>
        <?php } ?>
      </div><!--.col-1-->
      <div class="col-2">
        <div id="header-right-top">
          <div id="topbar">
            <ul>
              <li><a href="<?php bloginfo('url'); ?>/news-press-optima">What's New</a></li>
              <li><a href="<?php bloginfo('url'); ?>/about/optima-engineering-careers/">Careers</a></li>
              <li><a href="<?php bloginfo('url'); ?>/contact-optima">Contact Us</a></li>
              <li><a href="https://twitter.com/OptimaEngineer" target="_blank"><i class="fa fa-twitter"></i></a></li>
            </ul>
          </div><!-- #top bar -->
        </div><!-- #header-right-top -->

        <nav id="site-navigation" class="main-navigation" role="navigation">
          <button class="menu-toggle" aria-controls="primary-menu" aria-expanded="false"><?php esc_html_e( 'MENU', 'acstarter' ); ?></button>
          <?php wp_nav_menu( array( 'theme_location' => 'header-menu','menu_id' => 'primary-menu'  ) ); ?>
        </nav><!-- #navigation -->
      </div><!--.col-2-->
    </div><!--.wrapper-->
  </div><!--#masthead-->
    
    
    
  