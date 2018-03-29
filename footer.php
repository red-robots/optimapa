
</div> <!-- main -->



<div id="footer">
  <div class="wrapper">
    <?php $footer_title = get_field("footer_title","option");
    $charlotte_office_title = get_field("charlotte_office_title","option");
    $charlotte_office_line_1 = get_field("charlotte_office_line_1","option");
    $charlotte_office_line_2 = get_field("charlotte_office_line_2","option");
    $charlotte_office_phone = get_field("charlotte_office_phone","option");
    $raleigh_office_title = get_field("raleigh_office_title","option");
    $raleigh_office_line_1 = get_field("raleigh_office_line_1","option");
    $raleigh_office_line_2 = get_field("raleigh_office_line_2","option");
    $raleigh_office_phone = get_field("raleigh_office_phone","option");
    $email = get_field("email","option");
    $copyright = get_field("copyright","option");
    $sitemap_text = get_field("sitemap_text","option");
    $sitemap_link = get_field("sitemap_link","option");?>
    <header class="row-1">
      <h2><?php echo $footer_title;?></h2>
    </header>
    <div class="row-2 clear-bottom">
      <div class="col-1 col first">
        <?php if($charlotte_office_title):?>
          <header>
            <h3><?php echo $charlotte_office_title;?></h3>
          </header>
        <?php endif;
        if($charlotte_office_line_1):?>
          <div class="line-1">
            <?php echo $charlotte_office_line_1;?>
          </div><!--.line-1-->
        <?php endif;
        if($charlotte_office_line_2):?>
          <div class="line-2">
            <?php echo $charlotte_office_line_2;?>
          </div><!--.line-2-->
        <?php endif;
        if($charlotte_office_phone):?>
          <div class="phone">
            <?php echo $charlotte_office_phone;?>
          </div><!--.phone-->
        <?php endif;?>
      </div><!--.col-1-->
      <div class="col-2 col">
        <?php if($raleigh_office_title):?>
          <header>
            <h3><?php echo $raleigh_office_title;?></h3>
          </header>
        <?php endif;
        if($raleigh_office_line_1):?>
          <div class="line-1">
            <?php echo $raleigh_office_line_1;?>
          </div><!--.line-1-->
        <?php endif;
        if($raleigh_office_line_2):?>
          <div class="line-2">
            <?php echo $raleigh_office_line_2;?>
          </div><!--.line-2-->
        <?php endif;
        if($raleigh_office_phone):?>
          <div class="phone">
            <?php echo $raleigh_office_phone;?>
          </div><!--.phone-->
        <?php endif;?>
      </div><!--.col-2-->
      <div class="col-3 col">
        <?php if($email):?>
          <div class="email">
            <?php echo do_shortcode('[email-obfuscate email="'.$email.'"]'); ?>
          </div><!--.email-->
        <?php endif;
        if($copyright):?>
          <div class="copyright">
            <?php echo $copyright;?>
          </div><!--.copyright-->
        <?php endif;
        if($sitemap_link&&$sitemap_text):?>
          <div class="sitemap">
            <a href="<?php echo $sitemap_link;?>">
              <?php echo $sitemap_text;?>
            </a>
          </div><!--.phone-->
        <?php endif;?>
      </div><!--.col-3-->
      <div class="col-4 col last clear-bottom">
        <?php echo get_search_form();?>
      </div><!--.col-4-->
    </div><!--.row-2-->
  </div><!--.wrapper-->
</div><!-- footer -->

<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-102761708-1', 'auto');
  ga('send', 'pageview');

</script>
	

<?php wp_footer(); ?>
<script type="text/javascript">

function printSelection(node){

  var content=node.innerHTML
  var pwin=window.open('','print_content','width=100,height=100');

  pwin.document.open();
  pwin.document.write('<html><body onload="window.print()">'+content+'</body></html>');
  pwin.document.close();
 
  setTimeout(function(){pwin.close();},1000);

}
</script>
</body>
</html>