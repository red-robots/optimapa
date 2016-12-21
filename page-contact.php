<?php 
/*
* Template Name: Contact
*
*/
get_header(); ?>


<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>


<div id="page-content">


<div class="contact-left">
     <h1><?php the_title(); ?></h1>
     <div id="the-content">
     <?php the_content(); ?>
     </div>
     
     <?php // If a Side Box is Defined....
 if(get_field('addresses')): ?>
 	<?php while(has_sub_field('addresses')): ?>
 
		<div class="address">
        <div class="address-box">
			<?php the_sub_field('address'); ?>
            
            </div><!-- address box -->
            
            <div class="contact-google-map"><?php the_sub_field('google_map'); ?></div>
        </div><!-- address -->
 
	<?php endwhile; ?>
<?php endif; ?>
     
     
</div>




     <div class="contact-featured">
     <?php if ( has_post_thumbnail() ) {
	the_post_thumbnail('original',array('class' => 'alignright')); } ?>
     </div>
     
     
    
     
     

     
     <?php endwhile; endif; ?>

<?php //get_sidebar(); ?>
     
     
 </div><!-- / page content -->



<?php get_footer(); ?>