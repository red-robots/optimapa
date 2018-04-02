<?php
/**
 * Template Name: Blog
 */

get_header(); ?>

	



<div id="page-content" class="wrapper">

<h1>What's New</h1>




<div id="alpha">
<?php 
// the query

$temp = $wp_query;
$wp_query = null;
$wp_query = new WP_Query();
$wp_query->query(array(
	'post_type'=>'post',
	'paged' => $paged,
	'posts_per_page' => 12,
));

while ($wp_query->have_posts()) : $wp_query->the_post(); ?>
<div class="blog-square">
<a href="<?php the_permalink(); ?>">
<div class="readmore-nonblock">Read More &raquo;</div>

<div class="blogimg">
	<?php if ( has_post_thumbnail() ) { the_post_thumbnail('medium'); } ?>
</div>


<h2 class="blog-title">
<?php if(get_field('alternate_title')!="") { 
the_field('alternate_title'); } else { 
the_title(); }?>
</h2>
</a>            
</div><!-- blog-square -->

<?php endwhile;/* endif;*/ ?>

 </div><!-- alpha -->
 
  <div id="beta"></div>
 
 <div class="bella-pagi">
<?php bellaworks_pagi_nav(); ?>
</div>
 

  </div><!-- page content -->

<?php //get_sidebar(); ?>
<?php get_footer(); ?>