<?php
/**
 * Displays a Sinlge Post
 */

get_header(); ?>


<?php get_template_part('includes/category-nav-bar'); ?>
    
<div id="proj-page-content" class="clear-bottom">
<div id="proj-page-upper">


<?php if (has_term('k-12-education','categories')) {$projDetails = "pro-det-k-12-single"; $myTax = 'k-12-education';
$nextlink = 'Next Project in K-12 Education';}
		elseif (has_term('higher-ed','categories')) {$projDetails = "pro-det-higher-single"; $myTax = 'higher-ed';$nextlink = 'Next Project in Higher Ed';}
		elseif (has_term('healthcare','categories')) {$projDetails = "pro-det-health-single"; $myTax = 'healthcare';$nextlink = 'Next Project in Healthcare';}
		elseif (has_term('mission-critical','categories')) {$projDetails = "pro-det-mission-single"; $myTax = 'mission-critical';$nextlink = 'Next Project in Mission Critical';}
		elseif (has_term('commercial','categories')) {$projDetails = "pro-det-comm-single"; $myTax = 'commercial';$nextlink = 'Next Project in Commercial';}
		elseif (has_term('multi-family-mixed-use','categories')) {$projDetails = "pro-det-multi-single"; $myTax = 'multi-family-mixed-use';$nextlink = 'Next Project in Multi Family/Mixed Use';}
		elseif (has_term('government','categories')) {$projDetails = "pro-det-gov-single"; $myTax = 'government';$nextlink = 'Next Project in Government';}
		elseif (has_term('more-engineering-projects','categories')) {$projDetails = "pro-det-mo-single"; $myTax = 'more-engineering-projects';$nextlink = 'Next Project in More Engineering Projects';}
?>

<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>




<div id="page-left-single-proj">




<div id="project-details" class="<?php echo $projDetails; ?>">
<h1 class="title-higher"><strong><?php the_title(); ?></strong></h1>
	<?php 
	$summary = get_field('project_summary');
	$location = get_field('project_location');
	$highlights = get_field('project_highlights');?>
	<?php if($location):?>
		<p><?php echo $location; ?></p>
	<?php endif;?>
	<?php if($summary):?>
		<h3>Project Summary</h3>
		<p>
		<?php echo $summary; ?>
		</p>
	<?php endif;?>
	<?php if($highlights):?>
		<h3>Project Highlights</h3>
		<?php echo $highlights; ?>
	<?php endif;?>
    
    
    
    
    

    
    
    
</div><!-- project details -->



				

  
 	
     
<!-- Start Advanced Gallery Html Containers -->				
				<div class="navigation-container">
					<div id="thumbs" class="proj-navigation">
						<!--<a class="pageLink prev" style="visibility: hidden;" href="#" title="Previous Page"></a>-->
					
						<ul class="thumbs noscript">
                        <?php // If a Side Box is Defined....
								 if(get_field('project_gallery')): ?>
									<?php while(the_repeater_field('project_gallery')): ?>
                                    <?php $image = wp_get_attachment_image_src(get_sub_field('project_images'), 'full'); ?>
									<?php $thumb = wp_get_attachment_image_src(get_sub_field('project_images'), 'gallery-thumbnail'); ?>
							<li>
								<a class="thumb" name="<?php  the_sub_field('title');?>" href="<?php echo $image[0]; ?>" title="Title #0">
									<img src="<?php echo $thumb[0]; ?>" alt="<?php  the_sub_field('title');?>" rel="" />
								</a>
							
							</li>
	
							
                            <?php endwhile; ?>
							<?php endif; ?>
                            
                            
                            

 

	
                            
                            
                            
							
						</ul>
						<!--<a class="pageLink next" style="visibility: hidden;" href="#" title="Next Page"></a>-->
					</div>
				</div>
                <div class="clear"></div>
      <!--  <div id="controls" class="controls"></div>-->
</div><!-- page left -->


<div id="single-proj-right">
				<div class="content">
					<div class="slideshow-container">
						
						<div id="loading" class="loader"></div>
						<div id="slideshow" class="slideshow"></div>
					</div><!-- slideshow container -->
					<!--<div id="caption" class="caption-container">
						<div class="photo-index"></div>
					</div> caption -->
				</div><!-- content -->
</div><!-- single project right -->
<div class="clear"></div>

<div class="proj-pagi">
 <?php
    // Get the url you are coming from. Pulled out of the "Smarter Post link" plugin.
	$camefrom = get_referrer_url();
	
	// if the url has these terms in the array, show  next_post_link_plus, if not, leave it empty.
    if (strpos($camefrom, 'expertise') !== false) { ?>
		 <div class="viewall">View all in <?php referrer_link(); ?></div>
    <?php } elseif (strpos($camefrom, 'sustainable-features') !== false) { ?>
    	<div class="viewall">View all in <?php referrer_link(); ?></div>
	<?php } else { ?>
	<?php  next_post_link_plus( array(
			'order_by' => 'post_date',
			'loop' => true,
			'max_length' => 0,
			'format' => '%link &raquo;',
			'link' => $nextlink,
			'tooltip' => '%title',
			'in_same_tax' => 'categories',
			'num_results' => 1,
		) ); ?>
	<?php } ?>		

                  
                 <div class="clear"></div>

<?php //echo get_referrer_url(); ?>


<?php //be_previous_post_link( '%link', '&laquo; Previous Project', true, '', 'categories' ); // uses plugin function ?>  <?php //be_next_post_link( '%link', 'Next Project &raquo;', true, '', 'categories' ); // uses plugin function ?>
</div>
</div><!-- proj page upper -->

<div class="clear"></div>

<div class="lower-content">
<div class="the-lower-content">
<a name="about-project"></a>
<div id="the-content">
     <?php the_content(); ?>
     </div>
</div><!-- the lower content -->
<div class="lower-tags">
Areas of Expertise: 
<?php 
$cats_tax = get_the_term_list( $post->ID, 'expertise', '<li>', ',</li><li>', '</li>') ;
?>  
<?php echo $cats_tax ?>
</div><!-- lower tags -->

<?php if(get_the_term_list($post->ID, 'sustainablefeatures')!="") { ?>
<div class="lower-tags">
Areas of Sustainable &amp; Resilient: 
<?php 
$cats_tax = get_the_term_list( $post->ID, 'sustainablefeatures', '<li>', ',</li><li>', '</li>') ;
?>  
<?php echo $cats_tax ?>
</div><!-- lower tags -->
<?php } ?>
<?php endwhile;  ?>



</div><!-- lower content -->


<?php  endif; ?>


     
 </div><!-- / page content -->
<?php get_footer(); ?>