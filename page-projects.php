<?php 
/**
* Template Name: Projects
*/
 get_header(); ?>





<div class="page-content">
 






<!--
##########################################

			K - 12

#########################################
-->


 <div class="project-box">
<div class="proj-box-title pro-det-k-12"><h2 class="title-k-12">K-12 Education Projects</h2></div>
<div class="project-box-contents">
<?php
$wp_query = new WP_Query();
$wp_query->query(array(
	'post_type'=>'projects',
	'posts_per_page' => 3,
	'categories' => 'k-12-education',
));
while ($wp_query->have_posts()) : $wp_query->the_post(); ?>
<div class="proj-post-div">
<a href="<?php the_permalink(); ?>">
<?php  if ( has_post_thumbnail() ) { ?>
<div class="thumbnail"><?php the_post_thumbnail('thumbnail'); ?></div>
<?php } else { ?>
<div class="thumbnail"><img src="<?php bloginfo('template_url'); ?>/images/thumb-default.png" width="75px" height="75px"/></div>
<?php } ?>
<div class="proj-title"><h3><?php the_title(); ?></h3></div>
</a>
 </div><!-- project post div -->
  
 

 <?php endwhile;   ?>
 <?php  wp_reset_postdata(); ?>
</div><!-- project box contents-->
 <div class="seeall-projects hover-k-12"><a href="<?php bloginfo('url'); ?>/project-categories/k-12-education">See all K-12 Projects</a></div>
 </div><!-- project box -->
 
 
 
 
 <!--
##########################################

			Higher Ed

#########################################
-->
 
 
 
  <div class="project-box">
<div class="proj-box-title pro-det-higher"><h2 class="title-higher">Higher Ed Projects</h2></div>
<div class="project-box-contents">
<?php
$wp_query = new WP_Query();
$wp_query->query(array(
	'post_type'=>'projects',
	'posts_per_page' => 3,
	'categories' => 'higher-ed',
));
while ($wp_query->have_posts()) : $wp_query->the_post(); ?>
<div class="proj-post-div">
<a href="<?php the_permalink(); ?>">
<?php  if ( has_post_thumbnail() ) { ?>
<div class="thumbnail"><?php the_post_thumbnail('thumbnail'); ?></div>
<?php } else { ?>
<div class="thumbnail"><img src="<?php bloginfo('template_url'); ?>/images/thumb-default.png" width="75px" height="75px"/></div>
<?php } ?>
<div class="proj-title"><h3><?php the_title(); ?></h3></div>
</a>
 </div><!-- project post div -->
 
 
 <?php endwhile;   ?>
 <?php  wp_reset_postdata(); ?>
 </div><!-- project box contents-->
<div class="seeall-projects hover-higher"><a href="<?php bloginfo('url'); ?>/project-categories/higher-ed">See all Higher Ed Projects</a></div>
 </div><!-- project box -->
 
 
 
 <!--
##########################################

			Healthcare

#########################################
-->
 
 
 
  <div class="project-box">
<div class="proj-box-title pro-det-health"><h2 class="title-health">Healthcare Projects</h2></div>
<div class="project-box-contents">
<?php
$wp_query = new WP_Query();
$wp_query->query(array(
	'post_type'=>'projects',
	'posts_per_page' => 3,
	'categories' => 'healthcare',
));
while ($wp_query->have_posts()) : $wp_query->the_post(); ?>
<div class="proj-post-div">
<a href="<?php the_permalink(); ?>">
<?php  if ( has_post_thumbnail() ) { ?>
<div class="thumbnail"><?php the_post_thumbnail('thumbnail'); ?></div>
<?php } else { ?>
<div class="thumbnail"><img src="<?php bloginfo('template_url'); ?>/images/thumb-default.png" width="75px" height="75px"/></div>
<?php } ?>
<div class="proj-title"><h3><?php the_title(); ?></h3></div>
</a>
 </div><!-- project post div -->
 
 
 <?php endwhile;   ?>
 <?php  wp_reset_postdata(); ?>
 </div><!-- project box contents-->
<div class="seeall-projects hover-health"><a href="<?php bloginfo('url'); ?>/project-categories/healthcare">See all Healthcare Projects</a></div>
 </div><!-- project box -->
 
 
 
 
 <!--
##########################################

			Mission Critical

#########################################
-->
 
 
 
  <div class="project-box">
<div class="proj-box-title pro-det-mission"><h2 class="title-mission">Mission Critical Projects</h2></div>
<div class="project-box-contents">
<?php
$wp_query = new WP_Query();
$wp_query->query(array(
	'post_type'=>'projects',
	'posts_per_page' => 3,
	'categories' => 'mission-critical',
));
while ($wp_query->have_posts()) : $wp_query->the_post(); ?>
<div class="proj-post-div">
<a href="<?php the_permalink(); ?>">
<?php  if ( has_post_thumbnail() ) { ?>
<div class="thumbnail"><?php the_post_thumbnail('thumbnail'); ?></div>
<?php } else { ?>
<div class="thumbnail"><img src="<?php bloginfo('template_url'); ?>/images/thumb-default.png" width="75px" height="75px"/></div>
<?php } ?>
<div class="proj-title"><h3><?php the_title(); ?></h3></div>
</a>
 </div><!-- project post div -->
 
 
 <?php endwhile;   ?>
 <?php  wp_reset_postdata(); ?>
 </div><!-- project box contents-->
<div class="seeall-projects hover-mission"><a href="<?php bloginfo('url'); ?>/project-categories/multi-family">See all Mission Critical Projects</a></div>
 </div><!-- project box -->
 
 
 
 <!--
##########################################

			Commercial

#########################################
-->
 
 
 
 
   <div class="project-box">
<div class="proj-box-title pro-det-comm"><h2 class="title-comm">Commercial Projects</h2></div>
<div class="project-box-contents">
<?php
$wp_query = new WP_Query();
$wp_query->query(array(
	'post_type'=>'projects',
	'posts_per_page' => 3,
	'categories' => 'commercial',
));
while ($wp_query->have_posts()) : $wp_query->the_post(); ?>
<div class="proj-post-div">
<a href="<?php the_permalink(); ?>">
<?php  if ( has_post_thumbnail() ) { ?>
<div class="thumbnail"><?php the_post_thumbnail('thumbnail'); ?></div>
<?php } else { ?>
<div class="thumbnail"><img src="<?php bloginfo('template_url'); ?>/images/thumb-default.png" width="75px" height="75px"/></div>
<?php } ?>
<div class="proj-title"><h3><?php the_title(); ?></h3></div>
</a>
 </div><!-- project post div -->
 
 
 <?php endwhile;   ?>
 <?php  wp_reset_postdata(); ?>
 </div><!-- project box contents-->
<div class="seeall-projects hover-comm"><a href="<?php bloginfo('url'); ?>/project-categories/commercial">See all Commercial Projects</a></div>
 </div><!-- project box -->
 
 
 
 <!--
##########################################

			Multi Family

#########################################
-->
 
 
 
 
   <div class="project-box">
<div class="proj-box-title pro-det-multi"><h2 class="title-multi">Multi-Family Projects</h2></div>
<div class="project-box-contents">
<?php
$wp_query = new WP_Query();
$wp_query->query(array(
	'post_type'=>'projects',
	'posts_per_page' => 3,
	'categories' => 'multi-family',
));
while ($wp_query->have_posts()) : $wp_query->the_post(); ?>
<div class="proj-post-div">
<a href="<?php the_permalink(); ?>">
<?php  if ( has_post_thumbnail() ) { ?>
<div class="thumbnail"><?php the_post_thumbnail('thumbnail'); ?></div>
<?php } else { ?>
<div class="thumbnail"><img src="<?php bloginfo('template_url'); ?>/images/thumb-default.png" width="75px" height="75px"/></div>
<?php } ?>
<div class="proj-title"><h3><?php the_title(); ?></h3></div>
</a>
 </div><!-- project post div -->
 
 <?php endwhile;   ?>
 <?php  wp_reset_postdata(); ?>
 </div><!-- project box contents-->
<div class="seeall-projects hover-multi"><a href="<?php bloginfo('url'); ?>/project-categories/multi-family">See all Multi-Family Projects</a></div>
 </div><!-- project box -->
 
 
 
 
 <!--
##########################################

			Government

#########################################
-->
 
 
 
   <div class="project-box">
<div class="proj-box-title pro-det-gov"><h2 class="title-gov">Government Projects</h2></div>
<div class="project-box-contents">
<?php
$wp_query = new WP_Query();
$wp_query->query(array(
	'post_type'=>'projects',
	'posts_per_page' => 3,
	'categories' => 'government',
));
while ($wp_query->have_posts()) : $wp_query->the_post(); ?>
<div class="proj-post-div">
<a href="<?php the_permalink(); ?>">
<?php  if ( has_post_thumbnail() ) { ?>
<div class="thumbnail"><?php the_post_thumbnail('thumbnail'); ?></div>
<?php } else { ?>
<div class="thumbnail"><img src="<?php bloginfo('template_url'); ?>/images/thumb-default.png" width="75px" height="75px"/></div>
<?php } ?>
<div class="proj-title"><h3><?php the_title(); ?></h3></div>
</a>
 </div><!-- project post div -->
 
 
 <?php endwhile;   ?>
 <?php  wp_reset_postdata(); ?>
 </div><!-- project box contents-->
<div class="seeall-projects hover-gov"><a href="<?php bloginfo('url'); ?>/project-categories/government">See all Government Projects</a></div>
 </div><!-- project box -->
 
 
 
 
 <!--
##########################################

			More / Other

#########################################
-->
 
 
 
 
   <div class="project-box">
<div class="proj-box-title pro-det-mo"><h2 class="title-mo">More Projects</h2></div>
<div class="project-box-contents">
<?php
$wp_query = new WP_Query();
$wp_query->query(array(
	'post_type'=>'projects',
	'posts_per_page' => 3,
	'categories' => 'more-engineering-projects',
));
while ($wp_query->have_posts()) : $wp_query->the_post(); ?>
<div class="proj-post-div">
<a href="<?php the_permalink(); ?>">
<?php  if ( has_post_thumbnail() ) { ?>
<div class="thumbnail"><?php the_post_thumbnail('thumbnail'); ?></div>
<?php } else { ?>
<div class="thumbnail"><img src="<?php bloginfo('template_url'); ?>/images/thumb-default.png" width="75px" height="75px"/></div>
<?php } ?>
<div class="proj-title"><h3><?php the_title(); ?></h3></div>
</a>
 </div><!-- project post div -->
 
 
 <?php endwhile;   ?>
 <?php  wp_reset_postdata(); ?>
 </div><!-- project box contents-->
<div class="seeall-projects hover-mo"><a href="<?php bloginfo('url'); ?>/project-categories/more-engineering-projects/">More Projects</a></div>
 </div><!-- project box -->
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 </div><!-- / page content -->




<?php get_footer(); ?>