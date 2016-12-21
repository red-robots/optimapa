<?php get_header(); ?>


<?php //if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>


<div id="page-content">



<div id="page-tax">
     <h2><?php single_cat_title( $prefix = '', $display = true ); ?></h2>
     
   
     
	<?php $id = $wp_query->queried_object->term_id; // set the id of the queried term ?>
	<img src="<?php the_field('featured_image', 'sustainablefeatures'. $id); ?>" class="alignright" height="400px" style="margin-top:-15px;" />
  
   
   <?php echo category_description( $category_id ); ?>
</div><!-- / page left -->
     
     <?php //endwhile; endif; ?>
     



<div class="clear"></div>


<?php if(is_tax('sustainablefeatures', 'overview')) { } else { ?>
<div class="proj-name-bar"><h3>Projects Featuring <?php single_cat_title( $prefix = '', $display = true ); ?></h2></div><!-- prod name bar -->
<?php } ?>











 
  
<?php
$current_query = $wp_query->query_vars;
$wp_query = new WP_Query();
$wp_query->query(array(
	$current_query['taxonomy'] => $current_query['term'],
	'paged' => $paged,
	'posts_per_page' => 10,
));

while ($wp_query->have_posts()) : $wp_query->the_post(); ?>

<?php
  ++$counter;
  if($counter == 3) {
    $postclass = 'class="third-post"';
    $counter = 0;
  } else { $postclass = 'other-post'; }
?>

<div class="blogentry-tax <?php echo $postclass; ?>">
<div class="readmore"><a href="<?php the_permalink(); ?>">See More &raquo;</a></div>
<div class="blogentry-left-tax">
        <div class="blog-featured-image">
				<?php
                //  Display the featured image. Must be inside a loop.
                if ( has_post_thumbnail() ) {
                    the_post_thumbnail('thumbnail');
                }
                // If you do not have a Featured Image, show a thumbnail stored in the themes images folder.
                else {
                    echo '<img src="' . get_bloginfo( 'template_url' ) . '/images/thumb-default.png" width="75px" height="75px" />';
                     }
                ?>
        </div><!-- blog featured image  -->
        </div><!-- blogentry left  -->


<div class="blogentry-right-tax">
  <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
 <?php  //echo get_excerpt(300); ?> 
</div><!-- blogentry right -->  
</div><!-- blogentry -->


<?php endwhile; /*endif;*/ wp_reset_postdata(); ?>



     
     
 </div><!-- / page content -->



<?php get_footer(); ?>