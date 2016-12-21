<?php
/*
*
* Template Name: Default Template
*
*
*/ 

get_header(); ?>


<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>


<div id="page-content">



     <h1><?php the_title(); ?></h1>
    <?php if (has_post_thumbnail( $post->ID ) ) { ?>
    <?php $image = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'single-post-thumbnail' ); ?>

	<img src="<?php echo $image[0]; ?>" class="alignright" height="400px" style="margin-top:-15px;" />

    <?php } ?>
     <div id="the-content">
     <?php the_content(); ?>
     </div>
     
     
     
     
     
     <?php if(is_page('about-optima-engineering')) { ?>    
    <?php 
	$listem = array(
		  'depth'        => 0,
	'show_date'    => '',
	'date_format'  => get_option('date_format'),
	'child_of'     => 93,
	'exclude'      => '',
	'include'      => '',
	'title_li'     => '',
	'echo'         => 1,
	'authors'      => '',
	'sort_column'  => 'menu_order, post_title',
	'link_before'  => '',
	'link_after'   => '',
	'walker'       => '',
	'post_type'    => 'page',
        'post_status'  => 'publish' 
);
?>
<div class="cust-tax-list">
<?php 	
wp_list_pages( $listem );
	?>
</div>
    
<?php  } else { } ?>    
     
     
     

     
     <?php endwhile; endif; ?>


     
     
 </div><!-- / page content -->



<?php get_footer(); ?>