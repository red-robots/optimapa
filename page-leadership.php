<?php 
/*
* Template Name: Leadership
*
*/
get_header(); ?>


<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>


<div id="page-content" class="wrapper">



     <h1><?php the_title(); ?></h1>
     <?php //the_content(); ?>
     
     
     
     <?php // If a Leadership Row has been saved...
 if(get_field('leadership')): ?>
 	<?php while(has_sub_field('leadership')): ?>
 
		
        <?php // image varibles 
				$attachment_id = get_sub_field('picture');
				$size = "leadership"; // (thumbnail, medium, large, full or custom size)
 				$image = wp_get_attachment_image_src( $attachment_id, $size );
				//$alt = get_post_meta($attachment->ID, '_wp_attachment_image_alt', true);
		?>
        
        <div class="leadership-row">
        <div class="leadership-pic"><img src="<?php echo $image[0]; ?>" alt="<?php //echo $alt ?>" /></div>
        <div class="leadership-right"> 
            <h3><?php the_sub_field('title'); ?></h3>
            <?php the_sub_field('contents'); ?>
        </div><!-- leadership right -->
        </div><!-- side item -->
 
	<?php endwhile; ?>
<?php endif; ?>
     
     
     
     

     
     <?php endwhile; endif; ?>

<?php //get_sidebar(); ?>
     
     
 </div><!-- / page content -->



<?php get_footer(); ?>