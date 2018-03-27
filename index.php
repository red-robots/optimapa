<?php get_header(); ?>
    <div id="primary">
        <article class="template-index">
            <?php $row_1_copy = get_field("row_1_copy",2103);
            $row_1_title = get_field("row_1_title",2103);
            $row_1_image = get_field("row_1_image",2103);
            if($row_1_image):?>
                <div class="row-1" <?php echo 'style="background-image: url('.$row_1_image['url'].');"';?>>
                    <div class="wrapper">
                        <div class="inner-wrapper">
                            <?php if($row_1_title):?>
                                <header>
                                    <h1><?php echo $row_1_title;?></h1>
                                </header>
                            <?php endif;
                            if($row_1_copy):?>
                                <div class="copy">
                                    <?php echo $row_1_copy;?>
                                </div><!--.copy-->
                            <?php endif;?>
                        </div><!--.wrapper-->
                    </div><!--.wrapper-->
                </div><!--.row-1-->
            <?php endif;?>
            <div class="row-2">    
                <div class="wrapper">
                    <?php $row_2_title = get_field("row_2_title");
                    if($row_2_title):?>
                        <header class="row-1">
                            <h2><?php echo $row_2_title;?></h2>
                        </header>       
                    <?php endif; ?>     
                    <?php $terms = get_terms(array('taxonomy'=>'categories', 'hide_empty'=>false));
                    if(!is_wp_error($terms)&&is_array($terms)&&!empty($terms)):?>
                        <div class="row-2">
                            <?php foreach($terms as $term):?>
                                <?php $image = get_field("featured_image", $term);
                                $fa_text = get_field("font_awesome",$term);
                                if($image):?>
                                    <div class="box" <?php echo 'style="background-image: url('.$image.');"';?>>
                                        <?php if($fa_text):?>
                                            <div class="font-awesome">
                                                <i class="<?php echo $fa_text;?>"></i>
                                            </div><!--.font-awesome-->
                                        <?php endif;?>
                                        <header>
                                            <h3><?php echo $term->name;?></h3>
                                        </header>
                                    </div><!--.box-->
                                <?php endif;?>
                            <?php endforeach;?>
                        </div><!--.row-2-->
                    <?php endif;?>
                </div><!--.wrapper-->
            </div><!--.row-2-->

            <div id="home-bot-left">
            <?php
            $wp_query = new WP_Query();
            $wp_query->query(array(
                'post_type'=>'page',
                'page_id' => '136',
                'posts_per_page' => 1,
            ));
            while ($wp_query->have_posts()) : $wp_query->the_post(); ?>
            <?php //bloginfo('description'); ?>

            <?php the_excerpt(); ?>
            <a href="<?php the_permalink(); ?>">More</a>
            <!--<p>Optima Engineering is an experienced, multi-disciplined, professional firm specializing in mechanical, electrical, plumbing and fire protection engineering, with offices in Charlotte, NC (LEED Platinum) and Raleigh, NC.  Our firm’s industry-leading expertise includes BIM IPD (Revit and Navisworks), lighting systems technology design, mission critical CFD analysis, building commissioning, code compliance, energy modeling and energy management. </p>
            
            <p>We aren’t your typical, introverted, pocket-protected engineering firm.  We have a dynamic, young, talented staff that emphasizes thorough and frequent communication with our clients, high-quality design work, accurate budget projections and careful schedule tracking.  We take pride in our position as a reliable, knowledgeable source for creative and sustainable building design solutions.</p>-->
            <?php endwhile;   ?>
            <?php  wp_reset_postdata(); ?>
            
            

            </div><!-- / home bot leftr -->



            <div id="home-bot-right">
            <h2>What's New </h2>
            <div class="clear"></div>
            <?php query_posts( 'posts_per_page=2&category_name=whats-new' ); ?>
            <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>



                    
                    <div class="dateh-home">
                        <?php the_time('F j, Y'); ?>
                            <div class="read-event"><a href="<?php the_permalink(); ?>">Read &raquo;</a></div>
                            </div>
                
                    
            <h2 class="other-title-home"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>





            <div class="clear"></div>





            <?php endwhile; endif;  ?>
            <?php  wp_reset_query(); ?> 
            <?php rewind_posts(); ?>
            <a href="<?php bloginfo('ulr'); ?>/news-press-optima">See More</a>
            </div><!-- / home bot right -->
        </article><!--.template-index-->
    </div><!--#primary-->
<?php get_footer(); ?>