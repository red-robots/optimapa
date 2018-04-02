<?php get_header(); ?>


<div id="page-content" class="wrapper">
<div id="page-tax">
   <?php  // set the id and slug of the queried term
	
		$id = $wp_query->queried_object->term_id;
		$taxonomy = $wp_query->queried_object->taxonomy;  
		
		?>   
     
     <h1>
	 <?php 
	 if(get_field('alternate_title', $taxonomy.'_'. $id )!="") {
		 the_field('alternate_title', $taxonomy.'_'. $id);
	 } else {
	 single_cat_title( $prefix = '', $display = true ); } ?>
     </h1>
     
  
	<img src="<?php the_field('featured_image', $taxonomy.'_'. $id); ?>" class="alignright" height="400px" />
  
   
   	<?php echo category_description( $category_id ); ?>
    
    
    <div class="clear"></div>
    
    
<?php if(is_tax($taxonomy, 'overview')) { ?>    
    <?php 
	$listem = array(
		  'taxonomy'     => $taxonomy,
		  'title_li'     => $title,
		  'use_desc_for_title' => 'false',
);
?>
<div class="cust-tax-list clear-bottom">
<?php 	
wp_list_categories( $listem );
	?>
</div>
    
<?php  } else { } ?>    
    
    

    
    
    
</div><!-- / page left -->
     
<div class="clear"></div>


<?php if(is_tax($taxonomy, 'overview')) { } else { ?>
<div class="proj-name-bar"><h3>Projects Featuring <?php single_cat_title( $prefix = '', $display = true ); ?></h2></div><!-- prod name bar -->
<?php } ?>



<a name="blog"></a>
<?php 
// the query
$counter = 0;
$current_query = $wp_query->query_vars;

$wp_query = new WP_Query();
$wp_query->query(array(
	$current_query['taxonomy'] => $current_query['term'],
	'paged' => $paged,
	'posts_per_page' => 9,
));

while ($wp_query->have_posts()) : $wp_query->the_post(); ?>


<?php
  $counter++;
  if($counter == 3) {
    $postclass = 'last-post';
    $counter = 0;
  } else { $postclass = 'first-post'; }
?>

<div class="blogentry-tax <?php echo $postclass; ?> js-blocks">
<div class="readmore"><a href="<?php the_permalink(); ?>">See More &raquo;</a></div>
<div class="blogentry-left-tax">
       
        
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
      
        </div><!-- blogentry left  -->


<div class="blogentry-right-tax">
  <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
 <?php  //echo get_excerpt(300); ?> 
</div><!-- blogentry right -->  
</div><!-- blogentry -->


<?php endwhile; /*endif;*/ wp_reset_postdata(); ?>

<div class="clear"></div>

 <div class="bella-pagi">
<?php bellaworks_pagi_nav(); ?>
</div>

     
     
 </div><!-- / page content -->



<?php get_footer(); ?>