<?php get_header(); ?>


<div id="template-tax">
<div id="page-content" class="wrapper">
   <?php  // set the id and slug of the queried term
	
		$id = $wp_query->queried_object->term_id;
		$taxonomy = $wp_query->queried_object->taxonomy;  
		
		?>   
     
     <h1>
	 <?php 
	 if(get_field('alternate_title', $taxonomy.'_'. $id )!="") {
		 the_field('alternate_title', $taxonomy.'_'. $id);
	 } else {
	 single_cat_title( $prefix = '', $display = true ); } ?>
     </h1>
     
  
	<img src="<?php the_field('featured_image', $taxonomy.'_'. $id); ?>" class="alignright" height="400px" />
  
   
   	<?php echo category_description( $category_id ); ?>
    
    
    <div class="clear"></div>
    
    
<?php if(is_tax($taxonomy, 'overview')) { ?>    
    <?php 
	$listem = array(
		  'taxonomy'     => $taxonomy,
		  'title_li'     => $title,
		  'use_desc_for_title' => 'false',
);
?>
<div class="cust-tax-list clear-bottom">
<?php 	
wp_list_categories( $listem );
	?>
</div>
    
<?php  } else { } ?>    
    
    

    
    
    
</div><!-- / page left -->
     
    <div class="clear"></div>
    <a name="blog"></a>
    <div class="row-3 projects-featured" >    
        <div class="wrapper">
            <header class="row-1">
                <h2>Projects Featuring <?php single_cat_title( $prefix = '', $display = true ); ?></h2>
                <div class="spacer"></div>
            </header>       
            <?php 
            $current_query = $wp_query->query_vars;
            $args = array(
                'post_type'=>'projects',
                'paged' => $paged,
                'posts_per_page' => 9,
                'orderby'=>'date',
                'order'=>'DESC',
                'tax_query'=>array(array(
                    'taxonomy'=>$current_query['taxonomy'],
                    'field'=>'slug',
                    'terms'=>$current_query['term']
                ))
            );
            $query = new WP_Query($args);
            if($query->have_posts()):?>
                <div class="row-2 clear-bottom">
                    <?php $read_more_text = get_field("read_more_text","option");
                    $i = 0;
                    while($query->have_posts()): $query->the_post();?>
                        <div class="box js-blocks <?php if($i%3===0) echo "first";?> <?php if(($i+1)%3===0) echo "last";?>">
                            <?php if(has_post_thumbnail()):?>
                                <?php the_post_thumbnail('medium');?>
                            <?php endif;?>
                            <header>
                                <h3><?php the_title();?></h3>
                            </header>
                            <div class="inner-wrapper">
                                <a href="<?php echo get_permalink();?>" class="button">
                                    <?php echo $read_more_text;?>
                                </a>
                            </div><!--.wrapper-->
                        </div><!--.box-->
                        <?php $i++;?>
                    <?php endwhile;?>
                </div><!--.row-2-->
                <?php wp_reset_postdata();
            endif;?>
            <div class="bella-pagi">
                <?php bellaworks_pagi_nav(); ?>
            </div>
        </div><!--.wrapper-->
    </div><!--.row-3-->
 </div><!-- / page content -->



<?php get_footer(); ?>