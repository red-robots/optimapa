<?php 
/*
*
* Template Name: Professional Licenses
*
*
*/
get_header(); ?>


<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>


<div id="page-content">



   
     
 <div class="pro-map-container">
   <h1><?php the_title(); ?></h1>
     <?php the_content(); ?>   
     <div class="pro-map"><img src="<?php bloginfo('template_url'); ?>/images/map.png" /></div><!-- / pro map -->
    
   </div><!-- / pro map containe --> 
     

     
     <?php endwhile; endif; ?>


  <div id="license-sidebar">
  
 <div class="pro-map-details">
     <h3>List of Professional Licenses</h3>
     
     <div class="license-left">
     <?php the_field('licenses_list'); ?>
     </div><!-- / license-col -->
     
     
     <div class="license-right">
     <?php the_field('licenses_list_right'); ?>
     </div><!-- / license-col -->
    
     </div><!-- / pro map deatials -->
</div><!-- sidebar -->   
     
 </div><!-- / page content -->



<?php get_footer(); ?>