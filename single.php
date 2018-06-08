<?php
/**
 * Displays a Sinlge Post
 */

get_header(); ?>

	

<div id="page-content" class="wrapper clear-bottom">




<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

<div id="page-left">
  <h1><?php the_title(); ?></h1>
  <?php if ( has_post_thumbnail() ) { the_post_thumbnail('medium', array('class' => 'alignleft')); } ?>
 		<?php the_content(); ?>

 		<?php 

		$images = get_field('gallery');

		if( $images ): ?>
		<h2>Photo Gallery</h2>
		    <div class="gallery">
		        <?php foreach( $images as $image ): ?>
		            <div class="thumb">
		            	<a class="gallery" href="<?php echo $image['url']; ?>">
		                     <img src="<?php echo $image['sizes']['thumbnail']; ?>" alt="<?php echo $image['alt']; ?>" />
		                </a>
		            </div>
		                
		               
		        <?php endforeach; ?>
		    </div>
		<?php endif; ?>
     
        <div id="comments">
<?php //comments_template('', true); ?>
</div>
        
</div><!-- page left -->






<?php endwhile; endif; ?>


<?php  get_sidebar(); ?>
     
 </div><!-- / page content -->
<?php get_footer(); ?> 