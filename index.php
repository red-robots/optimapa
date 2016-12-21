<?php get_header(); ?>



<div id="homepage-content">

<div id="info-box">
<div class="info-box-words">
 We<br />
 deliver<br />
 reliable,<br />
 high-quality,<br />
 innovative<br />
 engineering<br />
 solutions.
</div>
</div>

<div class="home-row">

<?php
$wp_query = new WP_Query();
$wp_query->query(array(
	'post_type'=>'projects',
	'posts_per_page' => 1,
	'categories' => 'k-12-education',
	'hero' => "yes"
));
while ($wp_query->have_posts()) : $wp_query->the_post(); ?>
<div class="home-square-1">
<?php  if ( has_post_thumbnail() ) { ?>
<div class="home-thumbnail"><?php the_post_thumbnail('home-thumbnail'); ?></div>
<?php } else { ?>
<div class="home-thumbnail"><img src="<?php bloginfo('template_url'); ?>/images/thumb-default.png" width="200px" height="200px"/></div>
<?php } ?>

<a href="<?php the_permalink(); ?>">
<div class="featureproject">Featured Project:</div>
<h3 class="home-h3"><?php the_title(); ?> &raquo;</h3>

   </a>  
   
   <div class="seemore1"><a href="<?php bloginfo('url'); ?>/project-categories/k-12-education/">see all</a></div>
        
    <div class="square-info-1" >
    <a href="<?php bloginfo('url'); ?>/project-categories/k-12-education/">
    <h2 class="home-h2">K-12 Education</h2>
    <?php the_field('home_page_description', 'categories_2'); ?>
    
    </a>
    </div><!-- /square info 1 -->
    
   
</div><!-- / home square -->
 <?php endwhile;   ?>
 <?php  wp_reset_postdata(); ?>




<?php
$wp_query = new WP_Query();
$wp_query->query(array(
	'post_type'=>'projects',
	'posts_per_page' => 1,
	'categories' => 'higher-ed',
	'hero' => "yes"
));
while ($wp_query->have_posts()) : $wp_query->the_post(); ?>
<div class="home-square-2" >
<?php  if ( has_post_thumbnail() ) { ?>
<div class="home-thumbnail"><?php the_post_thumbnail('home-thumbnail'); ?></div>
<?php } else { ?>
<div class="home-thumbnail"><img src="<?php bloginfo('template_url'); ?>/images/thumb-default.png" width="200px" height="200px"/></div>
<?php } ?>
<a href="<?php the_permalink(); ?>">
<div class="featureproject">Featured Project:</div>
<h3 class="home-h3"><?php the_title(); ?> &raquo;</h3>

 </a> 
 
  <div class="seemore2"><a href="<?php bloginfo('url'); ?>/project-categories/higher-ed/">see all</a></div>
        
    <div class="square-info-2" >
      <a href="<?php bloginfo('url'); ?>/project-categories/higher-ed/">
    <h2 class="home-h2">Higher Ed</h2>
    <?php the_field('home_page_description', 'categories_3'); ?>
   
    </a>
    </div><!-- /square info 1 -->
    
    
</div><!-- / home square -->
 <?php endwhile;   ?>
 <?php  wp_reset_postdata(); ?>




<?php
$wp_query = new WP_Query();
$wp_query->query(array(
	'post_type'=>'projects',
	'posts_per_page' => 1,
	'categories' => 'healthcare',
	'hero' => "yes"
));
while ($wp_query->have_posts()) : $wp_query->the_post(); ?>
<div class="home-square-3" >
<?php  if ( has_post_thumbnail() ) { ?>
<div class="home-thumbnail"><?php the_post_thumbnail('home-thumbnail'); ?></div>
<?php } else { ?>
<div class="home-thumbnail"><img src="<?php bloginfo('template_url'); ?>/images/thumb-default.png" width="200px" height="200px"/></div>
<?php } ?>
<a href="<?php the_permalink(); ?>">
<div class="featureproject">Featured Project:</div>
<h3 class="home-h3"><?php the_title(); ?> &raquo;</h3>
  </a>   
  
   <div class="seemore3"><a href="<?php bloginfo('url'); ?>/project-categories/healthcare/">see all</a></div>
      
    <div class="square-info-3" >
    <a href="<?php bloginfo('url'); ?>/project-categories/healthcare/">
    <h2 class="home-h2">Healthcare</h2>
    <?php the_field('home_page_description', 'categories_4'); ?>
    </a>
    </div><!-- /square info 1 -->
    
    
</div><!-- / home square -->
 <?php endwhile;   ?>
 <?php  wp_reset_postdata(); ?>




<?php
$wp_query = new WP_Query();
$wp_query->query(array(
	'post_type'=>'projects',
	'posts_per_page' => 1,
	'categories' => 'mission-critical',
	'hero' => "yes"
));
while ($wp_query->have_posts()) : $wp_query->the_post(); ?>
<div class="home-square-4" >
<?php  if ( has_post_thumbnail() ) { ?>
<div class="home-thumbnail"><?php the_post_thumbnail('home-thumbnail'); ?></div>
<?php } else { ?>
<div class="home-thumbnail"><img src="<?php bloginfo('template_url'); ?>/images/thumb-default.png" width="200px" height="200px"/></div>
<?php } ?>
<a href="<?php the_permalink(); ?>">
<div class="featureproject">Featured Project:</div>
<h3 class="home-h3"><?php the_title(); ?> &raquo;</h3>
  </a>  
  
   <div class="seemore4"><a href="<?php bloginfo('url'); ?>/project-categories/mission-critical/">see all</a></div>
       
    <div class="square-info-4" >
    <a href="<?php bloginfo('url'); ?>/project-categories/mission-critical/">
    <h2 class="home-h2">Mission Critical</h2>
    <?php the_field('home_page_description', 'categories_5'); ?>
    </a>
    </div><!-- /square info 1 -->
    
    
</div><!-- / home square -->
 <?php endwhile;   ?>
 <?php  wp_reset_postdata(); ?>





</div><!-- / home row -->








<div class="home-row">





<?php
$wp_query = new WP_Query();
$wp_query->query(array(
	'post_type'=>'projects',
	'posts_per_page' => 1,
	'categories' => 'commercial',
	'hero' => "yes"
));
while ($wp_query->have_posts()) : $wp_query->the_post(); ?>
<div class="home-square-5" >
<?php  if ( has_post_thumbnail() ) { ?>
<div class="home-thumbnail"><?php the_post_thumbnail('home-thumbnail'); ?></div>
<?php } else { ?>
<div class="home-thumbnail"><img src="<?php bloginfo('template_url'); ?>/images/thumb-default.png" width="200px" height="200px"/></div>
<?php } ?>
<a href="<?php the_permalink(); ?>">
<div class="featureproject-bottom">Featured Project:</div>
<h3 class="home-bottom-h3"><?php the_title(); ?> &raquo;</h3>
    </a> 
    
     <div class="seemore5"><a href="<?php bloginfo('url'); ?>/project-categories/commercial/">see all</a></div>
         
    <div class="square-info-5" >
    <a href="<?php bloginfo('url'); ?>/project-categories/commercial/">
    <h2 class="home-h2">Commercial</h2>
    <?php the_field('home_page_description', 'categories_6'); ?>
        </a>
    </div><!-- /square info 1 -->
    
   
</div><!-- / home square -->
 <?php endwhile;   ?>
 <?php  wp_reset_postdata(); ?>




<?php
$wp_query = new WP_Query();
$wp_query->query(array(
	'post_type'=>'projects',
	'posts_per_page' => 1,
	'categories' => 'multi-family',
	'hero' => "yes"
));
while ($wp_query->have_posts()) : $wp_query->the_post(); ?>
<div class="home-square-6" >
<?php  if ( has_post_thumbnail() ) { ?>
<div class="home-thumbnail"><?php the_post_thumbnail('home-thumbnail'); ?></div>
<?php } else { ?>
<div class="home-thumbnail"><img src="<?php bloginfo('template_url'); ?>/images/thumb-default.png" width="200px" height="200px"/></div>
<?php } ?>
<a href="<?php the_permalink(); ?>">
<div class="featureproject-bottom">Featured Project:</div>
<h3 class="home-bottom-h3"><?php the_title(); ?> &raquo;</h3>
  </a> 
  
   <div class="seemore6"><a href="<?php bloginfo('url'); ?>/project-categories/multi-family/">see all</a></div>
        
    <div class="square-info-6" >
    <a href="<?php bloginfo('url'); ?>/project-categories/multi-family/">
    <h2 class="home-h2">Multi-Family</h2>
    <?php the_field('home_page_description', 'categories_7'); ?>
    </a>
    </div><!-- /square info 1 -->
    
    
</div><!-- / home square -->
  <?php endwhile;   ?>
 <?php  wp_reset_postdata(); ?>




<?php
$wp_query = new WP_Query();
$wp_query->query(array(
	'post_type'=>'projects',
	'posts_per_page' => 1,
	'categories' => 'government',
	'hero' => "yes"
));
while ($wp_query->have_posts()) : $wp_query->the_post(); ?>
<div class="home-square-7" >
<?php  if ( has_post_thumbnail() ) { ?>
<div class="home-thumbnail"><?php the_post_thumbnail('home-thumbnail'); ?></div>
<?php } else { ?>
<div class="home-thumbnail"><img src="<?php bloginfo('template_url'); ?>/images/thumb-default.png" width="200px" height="200px"/></div>
<?php } ?>
<a href="<?php the_permalink(); ?>">
<div class="featureproject-bottom">Featured Project:</div>
<h3 class="home-bottom-h3"><?php the_title(); ?> &raquo;</h3>
    </a>
    
     <div class="seemore7"><a href="<?php bloginfo('url'); ?>/project-categories/government/">see all</a></div>
          
    <div class="square-info-7" >
    <a href="<?php bloginfo('url'); ?>/project-categories/government/">
    <h2 class="home-h2">Government</h2>
    <?php the_field('home_page_description', 'categories_8'); ?>
    </a>
    </div><!-- /square info 1 -->
    
   
</div><!-- / home square -->
 <?php endwhile;   ?>
 <?php  wp_reset_postdata(); ?>



<?php
$wp_query = new WP_Query();
$wp_query->query(array(
	'post_type'=>'projects',
	'posts_per_page' => 1,
	'categories' => 'more-engineering-projects',
	'hero' => "yes"
));
while ($wp_query->have_posts()) : $wp_query->the_post(); ?>
<div class="home-square-8" >
<?php  if ( has_post_thumbnail() ) { ?>
<div class="home-thumbnail"><?php the_post_thumbnail('home-thumbnail'); ?></div>
<?php } else { ?>
<div class="home-thumbnail"><img src="<?php bloginfo('template_url'); ?>/images/thumb-default.png" width="200px" height="200px"/></div>
<?php } ?>
<a href="<?php the_permalink(); ?>">
<div class="featureproject-bottom">Featured Project:</div>
<h3 class="home-bottom-h3"><?php the_title(); ?> &raquo;</h3>
 </a> 
 
  <div class="seemore8"><a href="<?php bloginfo('url'); ?>/project-categories/more-engineering-projects/">see all</a></div>
        
    <div class="square-info-8" >
    <a href="<?php bloginfo('url'); ?>/project-categories/more-engineering-projects/">
    <h2 class="home-h2">More</h2>
   <?php the_field('home_page_description', 'categories_9'); ?>
    </a>
    </div><!-- /square info 1 -->
    
    
</div><!-- / home square -->
 <?php endwhile;   ?>
 <?php  wp_reset_postdata(); ?>





</div><!-- / home row -->














</div><!-- / post container -->
	

<div class="clear"></div>



<div id="home-bot-left">
<?php
$wp_query = new WP_Query();
$wp_query->query(array(
	'post_type'=>'page',
	'page_id' => '136',
	'posts_per_page' => 1,
));
while ($wp_query->have_posts()) : $wp_query->the_post(); ?>
<?php //bloginfo('description'); ?>

<?php the_excerpt(); ?>
<a href="<?php the_permalink(); ?>">More</a>
<!--<p>Optima Engineering is an experienced, multi-disciplined, professional firm specializing in mechanical, electrical, plumbing and fire protection engineering, with offices in Charlotte, NC (LEED Platinum) and Raleigh, NC.  Our firm’s industry-leading expertise includes BIM IPD (Revit and Navisworks), lighting systems technology design, mission critical CFD analysis, building commissioning, code compliance, energy modeling and energy management. </p>
 
<p>We aren’t your typical, introverted, pocket-protected engineering firm.  We have a dynamic, young, talented staff that emphasizes thorough and frequent communication with our clients, high-quality design work, accurate budget projections and careful schedule tracking.  We take pride in our position as a reliable, knowledgeable source for creative and sustainable building design solutions.</p>-->
 <?php endwhile;   ?>
 <?php  wp_reset_postdata(); ?>
 
 

</div><!-- / home bot leftr -->



<div id="home-bot-right">
<h2>What's New </h2>
<div class="clear"></div>
<?php query_posts( 'posts_per_page=2&category_name=whats-new' ); ?>
<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>



  		
         <div class="dateh-home">
	 		<?php the_time('F j, Y'); ?>
                <div class="read-event"><a href="<?php the_permalink(); ?>">Read &raquo;</a></div>
                </div>
	
        
 <h2 class="other-title-home"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>





<div class="clear"></div>





 <?php endwhile; endif;  ?>
  <?php  wp_reset_query(); ?> 
<?php rewind_posts(); ?>
 <a href="<?php bloginfo('ulr'); ?>/news-press-optima">See More</a>
</div><!-- / home bot right -->




<?php //get_sidebar(); ?>

<?php get_footer(); ?>