<?php get_header(); ?>


<?php get_template_part('includes/category-nav-bar'); ?>

<article class="template-cat">
    <section class="row-1">
        <div class="wrapper">
            <header>
                <h1><?php single_cat_title( ); ?></h1>
            </header>
            <div class="copy">
                <?php $category = get_category( get_query_var( 'cat' ) );
                echo category_description( $category->cat_ID ); ?>
            </div><!-- .copy -->   
        </div><!--.wrapper-->
    </section><!-- .row-1 -->
    <?php if(have_posts()):?>
        <section class="row-2">
            <div class="wrapper clear-bottom">
                <?php $i=0;
                $read_more_text = get_field("read_more_text","option");
                while(have_posts()):the_post();?>
                    <div class="box js-blocks <?php if($i%3===0) echo "first";?> <?php if(($i+1)%3===0) echo "last";?>">
                        <?php if(has_post_thumbnail()):?>
                            <?php the_post_thumbnail('full');?>
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
            </div><!--.wrapper-->
        </section><!--.row-2-->  
    <?php endif;?>  
 </article><!-- #page content -->



<?php get_footer(); ?>