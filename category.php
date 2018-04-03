<?php 
// Template for the category
 get_header(); ?>





<div id="page-content" class="wrapper clear-bottom">
 

<div id="page-left">
<h3>category.php </h3>



<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>







<div class="archive-div">

<a href="<?php the_permalink(); ?>">

<div class="archive-descr">
<h3>cat<?php the_title(); ?></h3>
<?php echo get_excerpt(100); ?>
</div><!-- archive descr -->
</a>

 </div><!-- archive div -->

  <?php endwhile; ?>
  
   <?php  // bellaworks_pagi_nav(); ?>
  
  <?php  endif;  ?>

 
  </div><!-- page left -->
 
 
 
 
 
 
 
 
 
 
 
 <?php get_sidebar(); ?>
 
 
 </div><!-- / page content -->




<?php get_footer(); ?>