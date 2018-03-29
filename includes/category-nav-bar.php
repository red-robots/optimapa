<?php $terms = get_terms(array('taxonomy'=>'categories', 'hide_empty'=>false));
if(!is_wp_error($terms)&&is_array($terms)&&!empty($terms)):?>
    <div id="subnav" class="clear-bottom">
        <?php $read_more_text = get_field("read_more_text","option");
        $i = 0;
        foreach($terms as $term):?>
            <?php $fa_text = get_field("font_awesome",$term);?>
            <div class="box js-blocks <?php if($i%4===0) echo "first";?> <?php if(($i+1)%4===0) echo "last";?>">
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
