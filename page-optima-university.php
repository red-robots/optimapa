<?php 
/*
*
* Template Name: Optima University
*
*
*/


get_header(); ?>

<div id="page-content">




<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>



     <h1><?php the_title(); ?></h1>
     <?php the_content(); ?>
     
     <?php endwhile; endif; ?>

<?php  wp_reset_query(); // Reset Query  ?> 
<?php rewind_posts(); ?>


<div id="featured-event-cont">
   <!--<h2>Upcoming Events</h2>-->


<?php // Lets get our Featured Event

 $featuredargs = array(
    'post_type' => 'events',
    'featured' => "yes",
	'posts_per_page' => 1,
 );
$the_query = new WP_Query( $featuredargs ); ?>
<?php if ( $the_query->have_posts() ) : ?>

  <!-- pagination here -->

  <!-- the loop -->
  <?php while ( $the_query->have_posts() ) : $the_query->the_post(); ?>
  
  
  
  <div class="featured-event">
<div class="event-date">
	 <?php $date = DateTime::createFromFormat('Ymd', get_field('event_date'));
		echo $date->format('m/d/y'); ?>
</div><!-- / d event date -->
<div class="print"><a href="" onclick="printSelection(document.getElementById('featured-event-cont'));return false">print</a></div><!-- / print-->


     
     <div class="featured-event-summary">
      <h2><?php the_title(); ?></h2>
 <?php $date = DateTime::createFromFormat('Ymd', get_field('event_date'));
		echo $date->format('F d, Y'); ?>
	 <?php the_field('event_summary'); ?>
     </div><!-- / d event summary -->
     
     
     <div class="featured-event-details">
     
     <?php if(get_field('time')!="") { ?>
     <h3>TIME</h3>
     <p><?php the_field('time'); ?></p>
     <?php } ?>
     
     <?php if(get_field('location')!="") { ?>
     <h3>LOCATION</h3>
     <?php the_field('location'); ?>
     <?php } ?>
     
     <?php if(get_field('lunch')!="") { ?>
     <h3>LUNCH</h3>
     <?php the_field('lunch'); ?>
     <?php } ?>
     
     <?php if(get_field('rsvp')!="") { ?>
     <h3>RSVP</h3>
     <?php the_field('rsvp'); ?>
     <?php } ?>
     
     <?php if(get_field('additional_details')!="") { ?>
     <h3>ADDITIONAL DETAILS</h3>
     <p><?php the_field('additional_details'); ?></p>
     <?php } ?>
     
     
	 <?php //the_field('event_details'); ?>
     </div><!-- / d event details -->
     
 </div><!-- / featured event -->
  
  
  
<?php endwhile; endif; wp_reset_postdata(); // End Featrued Event?>

 </div><!-- / featured event cont -->




<div class="other-events-cont">
<h2>More Events</h2>
<?php  // Now lets' query the rest of the Events 
$wp_query = new WP_Query();
$wp_query->query(array(
	'post_type' => 'events',
	'paged' => $paged,
	'posts_per_page' => 5,
	'tax_query' => array(
     array(
       'taxonomy' => 'featured',
	    'field'    => 'slug',
       'terms'    => 'yes',  /// Don't show those events marked yes to feature this event. 
       'operator' => 'NOT IN' 
     ))
));

while ($wp_query->have_posts()) : $wp_query->the_post(); 

?>




  <div class="other-events">
  		
         <div class="dateh">
	 		<?php $date = DateTime::createFromFormat('Ymd', get_field('event_date'));
				echo $date->format('M d, Y'); ?>
                <div class="read-event"><a href="<?php the_permalink(); ?>">See Event Details &raquo;</a></div>
                </div>
	
        
 <h2 class="other-title"><?php the_title(); ?></h2>
 
         
     
 </div><!-- / featured event -->

     
     <?php endwhile; //endif; ?>

 <div class="bella-pagi">
<?php bellaworks_pagi_nav(); ?>
</div>
 </div><!-- /  other events container -->     
     
 </div><!-- / page content -->



<?php get_footer(); ?>