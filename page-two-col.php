<?php
/*
*
* Template Name: Two Column w/Gallery
*
*
*/ 

get_header(); ?>


<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
	<div id="page-content" class="wrapper clear-bottom">
		<h1><?php the_title(); ?></h1>
		<?php if (has_post_thumbnail( $post->ID ) ) { ?>
			<?php $image = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'single-post-thumbnail' ); ?>
			<img src="<?php echo $image[0]; ?>" class="alignright" height="400px" style="margin-top:-15px;" />
		<?php } ?>
		
		
		<section class="leftpage">
			<div id="the-content">
				<?php the_content(); ?>
			</div>
		</section>

		<section class="rightpage">
			<?php 

			$images = get_field('gallery');
			$size = 'full'; // (thumbnail, medium, large, full or custom size)

			if( $images ): ?>
			   
			        <?php foreach( $images as $image ): ?>
			            <div class="galleryimages">
			            	<?php echo wp_get_attachment_image( $image['ID'], $size ); ?>
			            </div>
			        <?php endforeach; ?>
			   
			<?php endif; ?>
		</section>	
		
		
		

	</div><!-- / page content -->
<?php endwhile; ?>
<?php endif; ?>
	
<?php get_footer(); ?>