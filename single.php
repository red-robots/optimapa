<?php
/**
 * Displays a Sinlge Post
 */

get_header(); ?>

	

<div id="page-content" class="wrapper clear-bottom">




<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

<div id="page-left">
  <h1><?php the_title(); ?></h1>
  <?php if ( has_post_thumbnail() ) { the_post_thumbnail('medium', array('class' => 'alignleft')); } ?>
 		<?php the_content(); ?>
     
        <div id="comments">
<?php //comments_template('', true); ?>
</div>
        
</div><!-- page left -->






<?php endwhile; endif; ?>


<?php  get_sidebar(); ?>
     
 </div><!-- / page content -->
<?php get_footer(); ?> 