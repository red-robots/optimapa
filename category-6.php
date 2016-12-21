<?php 
// Template for the category
 get_header(); ?>





<div class="page-content">
 
 <?php $loop = new WP_Query( array( 'post_type' => 'projects', 'posts_per_page' => '10', 'category_name' => single_cat_title('', false)) ); ?>
<?php while ( $loop->have_posts() ) : $loop->the_post(); ?>
// some content of loop goes here
<?php endwhile; ?>


<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
<div class="cat-page">
<a href="<?php the_permalink(); ?>">
<?php  if ( has_post_thumbnail() ) { ?>
<div class="thumbnail"><?php the_post_thumbnail('thumbnail'); ?></div>
<?php } else { ?>
<div class="thumbnail"><img src="<?php bloginfo('template_url'); ?>/images/thumb-default.png" width="75px" height="75px"/></div>
<?php } ?>
<div class="proj-title"><h3><?php the_title(); ?></h3></div>
</a>
 </div><!-- cat-page -->
 
 
 <?php endwhile; endif;  ?>
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 </div><!-- / page content -->




<?php get_footer(); ?>