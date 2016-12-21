
</div> <!-- main -->
<div class="clear"></div>



<div id="footer">
<div id="footer-cont">
Charlotte: 1927 South Tryon Street Suite 300 | Charlotte, NC 28203 | 704.338.1292 <br>
<!--Raleigh: 333 Fayetteville Street Suite 311 | Raleigh, NC 27601 | 919.856.4461-->
150 Fayetteville Street Suite 520, Raleigh, NC 27601 | 919.926.2200  <br>
  
 
 Optima Engineering &copy; <?php echo date('Y'); ?> | <?php echo do_shortcode('[email-obfuscate email="info@optimaengineering.com"]'); ?> | <a href="<?php bloginfo('url'); ?>/site-map">site map</a>
 
 
</div><!-- footer cont -->
</div><!-- footer -->


	

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