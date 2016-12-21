<?php 
// Template for the category
 get_header(); ?>





<div id="page-content">



<div id="page-left">
<h3>What's New Archives</h3>




<div id="alpha">
<?php wp_reset_query(); ?>
<?php
$wp_query->query_vars["posts_per_page"] = 5;
$wp_query->get_posts();
?>
<?php //global $query_string; query_posts($query_string . 'paged='.$paged); ?>
<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>





<div class="blog-square">
<a href="<?php the_permalink(); ?>">
<div class="readmore-nonblock">Read More &raquo;</div>
<?php if ( has_post_thumbnail() ) { the_post_thumbnail('medium'); } ?>

<h2>
<?php if(get_field('alternate_title')!="") { 
the_field('alternate_title'); } else { 
the_title(); }?>
</h2>
</a>            
</div><!-- blog-square -->
  
  <?php endwhile; endif;  ?> 
  </div><!-- alpha -->
  
  
<div id="beta"></div>  
<div class="clear"></div>

 <div class="bella-pagi">
<?php bellaworks_pagi_nav(); ?>
</div>
 

 
 
 
 
 
 
 
 
 
 
 
  </div><!-- page left -->
 
 
 
 
 
 
 
 
 
 
 
 <?php get_sidebar(); ?>
 
 
 </div><!-- / page content -->




<?php get_footer(); ?>