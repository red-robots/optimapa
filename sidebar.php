<div id="sidebar">
<h3>What's New Archives</h3>
<?php $args = array(
	'type'            => 'monthly',
	'limit'           => '',
	'format'          => 'html', 
	'before'          => '',
	'after'           => '',
	'show_post_count' => true,
	'echo'            => 1,
	'order'           => 'DESC'
); ?>
<ul>
<?php wp_get_archives( $args ); ?>
</ul>

<h3>Recent Entries</h3>
<?php
$wp_query = new WP_Query();
$wp_query->query(array(
	'post_type' => 'post',
	'paged' => $paged,
	'posts_per_page' => 3,
));
while ($wp_query->have_posts()) : $wp_query->the_post(); ?>


<div class="blog-square-side">
<a href="<?php the_permalink(); ?>">
<div class="readmore-nonblock">Read More &raquo;</div>
<?php if ( has_post_thumbnail() ) { the_post_thumbnail('medium'); } ?>

<h2>
<?php if(get_field('alternate_title')!="") { 
the_field('alternate_title'); } else { 
the_title(); }?>
</h2>
</a>            
</div><!-- blog-square -->

	
<?php endwhile; wp_reset_postdata(); ?>


</div><!-- sidebar -->