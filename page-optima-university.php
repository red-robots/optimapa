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
  <?php  wp_reset_postdata(); // Reset Query  ?>

  <?php // Lets get our Featured Event

    $featuredargs = array(
      'post_type' => 'events',
      // 'featured' => "yes",
      'posts_per_page' => -1,
      'meta_key'      => 'event_date',
      'orderby'     => 'meta_value',
      'order'       => 'DESC'
    );
    $the_query = new WP_Query( $featuredargs ); ?>
    <?php if ( $the_query->have_posts() ) : ?>
      <div class="flexevents">
        <?php while ( $the_query->have_posts() ) : $the_query->the_post(); 

        $image = get_field('image');
        $time = get_field('time');
         $pdf = get_field('pdf');

        // echo '<pre>';
        // print_r($image);
        // echo '</pre>';

      ?>
          <div class="opt-u">
            <div class="left">
              <div class="blogimg">
                <?php if ( $image != '' ) { ?>
                  <img src="<?php echo $image['url'] ?>" alt="<?php echo $image['alt'] ?>">
                <?php } ?>
              </div>
            </div>
            
            <div class="right">
              <h2 class="blog-title">
                <?php if(get_field('alternate_title')!="") {           
                        the_field('alternate_title'); 
                      } else { 
                        the_title(); 
                      } 
                ?>
              </h2>
              <?php 
               // get raw date
              $date = get_field('event_date', false, false);
              // make date object
              $date = new DateTime($date);
              ?>
              <div class="date">
                <?php echo $date->format('F Y'); ?>
              </div>
              <?php if($time != '') { ?>
                <!-- <div class="date">
                  Time: <?php //echo $time; ?>
                </div> -->
              <?php } ?>

              <!-- <div class="event-button">
                <a href="<?php the_permalink(); ?>">View Event</a> 
              </div> -->
              <?php if($pdf != '') { ?>
                <div class="event-button">
                  <a href="<?php echo $pdf; ?>">View PDF</a> 
                </div>
              <?php } ?>
            </div>
              
                       
          </div><!-- blog-square -->
        <?php endwhile;/* endif;*/ ?>
      
        <div class="bella-pagi">
          <?php bellaworks_pagi_nav(); ?>
        </div>

      </div>
    <?php endif; ?>

</div><!-- / page content -->
<?php get_footer(); ?>