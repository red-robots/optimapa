<?php 
/**
* Template Name: Custom Page
*/
 get_header(); ?>


<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>


<div id="page-content">
     <h1><?php the_title(); ?></h1>
     <?php the_content(); ?>
 </div><!-- / page content -->


<?php endwhile; endif; ?>

<?php //get_sidebar(); ?>
<?php get_footer(); ?>