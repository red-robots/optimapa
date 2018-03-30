<?php $terms = get_terms(array('taxonomy'=>'categories', 'hide_empty'=>false));
if(!is_wp_error($terms)&&is_array($terms)&&!empty($terms)):?>
    <div id="subnav">
        <?php $read_more_text = get_field("read_more_text","option");
        $i = 0;
        foreach($terms as $term):?>
            <?php $fa_text = get_field("font_awesome",$term);?>
            <div class="box js-blocks">
                <a href="<?php echo get_term_link($term->term_id);?>">
                    <?php if($fa_text):?>
                        <div class="font-awesome">
                            <i class="<?php echo $fa_text;?>"></i>
                        </div><!--.font-awesome-->
                    <?php endif;?>
                    <header>
                        <h3><?php echo $term->name;?></h3>
                    </header>
                </a>
            </div><!--.box-->
            <?php $i++;?>
        <?php endforeach;?>
    </div><!--#subnav-->
<?php endif;?>
