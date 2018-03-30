<?php $terms = get_terms(array('taxonomy'=>'categories', 'hide_empty'=>false));
if(!is_wp_error($terms)&&is_array($terms)&&!empty($terms)):?>
    <div id="subnav" class="clear-bottom">
        <?php $read_more_text = get_field("read_more_text","option");
        $i = 0;
        foreach($terms as $term):?>
            <?php $fa_text = get_field("font_awesome",$term);
            $actual_link = (isset($_SERVER['HTTPS']) ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
            $term_link = get_term_link($term->term_id);?>
            <div class="box <?php if(strcmp($term_link,$actual_link)===0) echo "active";?>">
                <a href="<?php echo $term_link;?>">
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
