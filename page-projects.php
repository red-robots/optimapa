<?php 
/**
* Template Name: Projects
*/
 get_header(); ?>





<div class="template-projects project-tiles">  
	<div class="wrapper">
		<header class="row-1">
			<h2><?php the_title()?></h2>
			<div class="spacer"></div>
		</header>       
		<?php $terms = get_terms(array('taxonomy'=>'categories', 'hide_empty'=>false));
		if(!is_wp_error($terms)&&is_array($terms)&&!empty($terms)):?>
			<div class="row-2 clear-bottom">
				<?php $read_more_text = get_field("read_more_text","option");
				$i = 0;
				foreach($terms as $term):?>
					<?php $image = get_field("featured_image", $term);
					$fa_text = get_field("font_awesome",$term);
					if($image):?>
						<div class="box js-blocks <?php if($i%4===0) echo "first";?> <?php if(($i+1)%4===0) echo "last";?>">
							<div class="background" <?php echo 'style="background-image: url('.$image['sizes']['medium'].');"';?>></div>
							<?php if($fa_text):?>
								<div class="font-awesome">
									<i class="<?php echo $fa_text;?>"></i>
								</div><!--.font-awesome-->
							<?php endif;?>
							<header>
								<h3><?php echo $term->name;?></h3>
							</header>
							<a href="<?php echo get_term_link($term->term_id);?>" class="button">
								<?php echo $read_more_text;?>
							</a>
						</div><!--.box-->
						<?php $i++;
					endif;?>
				<?php endforeach;?>
			</div><!--.row-2-->
		<?php endif;?>
	</div><!--.wrapper-->
 </div><!-- .template-projects -->
<?php get_footer(); ?>