<?php 
/*
* Template Name: Site Map
*
*
*/
get_header(); ?>


<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>


<div id="page-content" class="wrapper clear-bottom">


<div id="page-left">
     <h1><?php the_title(); ?></h1>
     <?php the_content(); ?>
     
     <div class="sitemap-column ">
     <h3>Pages</h3>
      <?php wp_list_pages('title_li='); ?>
      </div><!-- sitemap column -->
      
      
       <div class="sitemap-column ">
     <h3>Areas of Expertise</h3>
<?php $expertise = array(
	'show_option_all'    => '',
	'orderby'            => 'name',
	'order'              => 'ASC',
	'style'              => 'list',
	'show_count'         => 0,
	'hide_empty'         => 1,
	'use_desc_for_title' => 1,
	'child_of'           => 0,
	'feed'               => '',
	'feed_type'          => '',
	'feed_image'         => '',
	'exclude'            => '',
	'exclude_tree'       => '',
	'include'            => '',
	'hierarchical'       => 1,
	'title_li'           => __( '' ),
	'show_option_none'   => __('No categories'),
	'number'             => null,
	'echo'               => 1,
	'depth'              => 0,
	'current_category'   => 0,
	'pad_counts'         => 0,
	'taxonomy'           => 'expertise',
	'walker'             => null
); ?>
<?php wp_list_categories( $expertise ); ?> 

<h3>Sustainable &amp; Resilient</h3>
<?php $sustainablefeatures = array(
	'show_option_all'    => '',
	'orderby'            => 'name',
	'order'              => 'ASC',
	'style'              => 'list',
	'show_count'         => 0,
	'hide_empty'         => 1,
	'use_desc_for_title' => 1,
	'child_of'           => 0,
	'feed'               => '',
	'feed_type'          => '',
	'feed_image'         => '',
	'exclude'            => '',
	'exclude_tree'       => '',
	'include'            => '',
	'hierarchical'       => 1,
	'title_li'           => __( '' ),
	'show_option_none'   => __('No categories'),
	'number'             => null,
	'echo'               => 1,
	'depth'              => 0,
	'current_category'   => 0,
	'pad_counts'         => 0,
	'taxonomy'           => 'sustainablefeatures',
	'walker'             => null
); ?>
<?php wp_list_categories( $sustainablefeatures ); ?> 


<h3>Project Categories</h3>
<?php $categories = array(
	'show_option_all'    => '',
	'orderby'            => 'name',
	'order'              => 'ASC',
	'style'              => 'list',
	'show_count'         => 0,
	'hide_empty'         => 1,
	'use_desc_for_title' => 1,
	'child_of'           => 0,
	'feed'               => '',
	'feed_type'          => '',
	'feed_image'         => '',
	'exclude'            => '',
	'exclude_tree'       => '',
	'include'            => '',
	'hierarchical'       => 1,
	'title_li'           => __( '' ),
	'show_option_none'   => __('No categories'),
	'number'             => null,
	'echo'               => 1,
	'depth'              => 0,
	'current_category'   => 0,
	'pad_counts'         => 0,
	'taxonomy'           => 'categories',
	'walker'             => null
); ?>
<?php wp_list_categories( $categories ); ?> 
      </div><!-- sitemap column -->
     
     
     
     
</div><!-- / page left -->
     
     <?php endwhile; endif; ?>

<?php get_sidebar(); ?>
     
     
 </div><!-- / page content -->



<?php get_footer(); ?>