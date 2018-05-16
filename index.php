<?php get_header(); ?>
    <div id="primary">
        <article class="template-index">
            <?php $row_1_copy = get_field("row_1_copy",2103);
            $row_1_title = get_field("row_1_title",2103);
            $row_1_image = get_field("row_1_image",2103);
            if($row_1_image):?>
                <div class="row-1" <?php echo 'style="background-image: url('.$row_1_image['sizes']['large'].');"';?>>
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
            <div class="row-2 project-tiles">    
                <div class="wrapper">
                    <?php $row_2_title = get_field("row_2_title",2103);
                    if($row_2_title):?>
                        <header class="row-1">
                            <h2><?php echo $row_2_title;?></h2>
                            <div class="spacer"></div>
                        </header>       
                    <?php endif; ?>     
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
                                        <div class="background" <?php echo 'style="background-image: url('.$image['sizes']['large'].');"';?>></div>
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
            </div><!--.row-2-->
            <img class="row-between" src="<?php echo get_template_directory_uri().'/images/bg-2.jpg';?>" alt="background-2">
            <div class="row-3 projects-featured" >    
                <div class="wrapper">
                    <?php $row_3_title = get_field("row_3_title",2103);
                    if($row_3_title):?>
                        <header class="row-1">
                            <h2><?php echo $row_3_title;?></h2>
                            <div class="spacer"></div>
                        </header>       
                    <?php endif; ?>     
                    <?php $args = array(
                        'post_type'=>'post',
                        'posts_per_page'=>3,
                        'orderby'=>'date',
                        'order'=>'DESC'
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
                </div><!--.wrapper-->
            </div><!--.row-3-->
        </article><!--.template-index-->
    </div><!--#primary-->
<?php get_footer(); ?>