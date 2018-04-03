<?php get_header(); ?>





<div id="page-content" class="wrapper clear-bottom">


<div id="page-left">
     <h2>404 - Not Found</h2>
     <p>Sorry, all the engineering in the world cannot stop 404's. Please try again or try our <a href="<?php bloginfo('url'); ?>/site-map">sitemap</a>. </p><p> <?php wp_list_pages('title_li='); ?></p>
   
</div><!-- / page left -->
  

<?php //get_sidebar(); ?>
     
     
 </div><!-- / page content -->



<?php get_footer(); ?>