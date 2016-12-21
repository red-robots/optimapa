<?php get_header(); ?>


<?php get_template_part('includes/category-nav-bar'); ?>

<div id="page-content">
<?php 
              // Find the term we are searching and put it in a varible

if (has_term('k-12-education','categories')) {$projDetails = "pro-det-k-12"; $readMoreColor = "rm-k-12";$hColor = "color-k-12";}
		elseif (has_term('higher-ed','categories')) {$projDetails = "pro-det-higher"; $readMoreColor = "rm-higher";$hColor = "color-higher";}
		elseif (has_term('healthcare','categories')) {$projDetails = "pro-det-health"; $readMoreColor = "rm-health";$hColor = "color-health";}
		elseif (has_term('mission-critical','categories')) {$projDetails = "pro-det-mission"; $readMoreColor = "rm-mission";$hColor = "color-mission";}
		elseif (has_term('commercial','categories')) {$projDetails = "pro-det-comm"; $readMoreColor = "rm-comm";$hColor = "color-comm";}
		elseif (has_term('multi-family','categories')) {$projDetails = "pro-det-multi"; $readMoreColor = "rm-multi";$hColor = "color-multi";}
		elseif (has_term('government','categories')) {$projDetails = "pro-det-gov"; $readMoreColor = "rm-gov";$hColor = "color-gov";}
		elseif (has_term('more-engineering-projects','categories')) {$projDetails = "pro-det-mo"; $readMoreColor = "rm-mo";$hColor = "color-mo";}
?>


<div id="page-tax">

<h1 class="<?php echo $hColor; ?>"><?php single_cat_title( $prefix = '', $display = true ); ?></h1>
<div class="projcat-desc <?php echo $projDetails; ?>">

    
    <?php echo category_description( $category_id ); ?>
    
</div><!-- project details -->

     

     

















 <div id="page-right">
  
     <?php
     $i=0;
$current_query = $wp_query->query_vars;

$wp_query = new WP_Query();
$wp_query->query(array(
	$current_query['taxonomy'] => $current_query['term'],
	'paged' => $paged,
	'posts_per_page' => 10,
));


      
       

while ($wp_query->have_posts()) : $wp_query->the_post(); ?>

<?php
  $i++;
  if($i == 2) { // change number to pick which one is going to be different
    $postclass = 'last-post';
    $i = 0;
  } else { $postclass = 'first-post'; }
?>

<div class="blogentry-cat <?php echo $postclass; ?> js-blocks">
<div class="readmore-cat <?php echo $readMoreColor; ?>"><a href="<?php the_permalink(); ?>">See More &raquo;</a></div>
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



 </div><!-- / page right -->    
 </div><!-- / page tax -->    
 </div><!-- / page content -->



<?php get_footer(); ?>