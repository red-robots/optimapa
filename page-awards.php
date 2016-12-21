<?php 
/*
*
* Template Name: Awards
*
*
*/
get_header(); ?>





<div id="page-content">

<h1><?php the_title(); ?></h1>
<div id="alpha">
<?php // If a Side Box is Defined....
 if(get_field('awards')): ?>
 	<?php while(has_sub_field('awards')): ?>
    <?php
  ++$counter;
  if($counter == 3) {
    $postclass = 'purple';
    $counter = 0;
  } elseif($counter == 2) {
	  $postclass = 'green';
  }
  else
  { $postclass = 'orange'; }
?>
 <div class="blog-square">
		<div class="award <?php echo $postclass; ?>">
			<div class="award-name">
        	<?php the_sub_field('award_name'); ?>
            </div><!-- award name -->
            <div class="award-for">
        	<?php the_sub_field('award_given_for'); ?>
            </div><!-- award for -->
        
        </div><!-- side item -->
  </div><!-- blog square -->
	<?php endwhile; ?>
<?php endif; ?>
  </div><!-- / alpha -->   
     <div id="beta"></div>
 </div><!-- / page content -->



<?php get_footer(); ?>