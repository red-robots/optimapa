<?php 
// Enqueueing all the java script in a no conflict mode
 function ineedmyjava() {
	if (!is_admin()) {
 
		wp_deregister_script('jquery');
		wp_register_script('jquery', 'http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js', false, '1.8.3', true);
		wp_enqueue_script('jquery');
		
		
		
		// other scripts...
		// wp_register_script(
		// 	'vendors',
		// 	get_bloginfo('template_directory') . '/assets/js/vendors.js',
		// 	array('jquery'), '1.0', true );
		// wp_enqueue_script('vendors');
		
		
		
		// other scripts...
		wp_register_script(
			'navigation',
			get_bloginfo('template_directory') . '/js/navigation.js',
			array('jquery'), '1.0', true );
		wp_enqueue_script('navigation');

		// other scripts...
		wp_register_script(
			'blocks',
			get_bloginfo('template_directory') . '/js/blocks.js',
			array('jquery'), '1.0', true );
		wp_enqueue_script('blocks');

		// other scripts...
		wp_register_script(
			'columnizer',
			get_bloginfo('template_directory') . '/js/jquery.columnizer.js',
			array('jquery') );
		wp_enqueue_script('columnizer');
		
		
		// other scripts...
		wp_register_script(
			'thumbslider',
			get_bloginfo('template_directory') . '/js/jquery.easing.1.3.js',
			array('jquery') );
		wp_enqueue_script('thumbslider');
		
		
		// other scripts...
		wp_register_script(
			'projgallery',
			get_bloginfo('template_directory') . '/js/jquery.galleriffic.js',
			array('jquery') );
		wp_enqueue_script('projgallery');
		
		
		// other scripts...
		wp_register_script(
			'history',
			get_bloginfo('template_directory') . '/js/jquery.history.js',
			array('jquery') );
		wp_enqueue_script('history');
		
		
		// other scripts...
		wp_register_script(
			'opacityrollover',
			get_bloginfo('template_directory') . '/js/jquery.opacityrollover.js',
			array('jquery') );
		wp_enqueue_script('opacityrollover');
		
		
		
		// other scripts...
		wp_register_script(
			'scripts',
			get_bloginfo('template_directory') . '/js/isotope-scripts.js',
			array('jquery') );
		wp_enqueue_script('scripts');
		
		
		// other scripts...
		wp_register_script(
			'plugins',
			get_bloginfo('template_directory') . '/js/isotope-plugins.js',
			array('jquery') );
		wp_enqueue_script('plugins');

		// other scripts...
		wp_register_script(
			'custom',
			get_bloginfo('template_directory') . '/js/custom.js',
			array('jquery'), '1.0', true );
		wp_enqueue_script('custom');
		
		
		
	
		
		
	}
}
 
add_action('init', 'ineedmyjava');
?>
<?php

// Add Thumbnail Image Supoort
// Must have to do featured images.
add_theme_support( 'post-thumbnails' ); 
add_image_size( 'leadership', 350, 9999 ); //150 pixels wide (and unlimited height ... for the leadership page)
add_image_size( 'home-thumbnail', 210, 210, true ); //
add_image_size( 'gallery-thumbnail', 60, 60, true ); //
add_image_size( 'tax-descr', 9999, 500 );
?>
<?php
// add a favicon from your themes images folder
function blog_favicon() {
echo '<link rel="Shortcut Icon" type="image/x-icon" href="'.get_bloginfo('template_url').'/images/favicon.png" />';
}
add_action('wp_head', 'blog_favicon'); 
?>
<?php
// Removing certain admin menu items by name...
function remove_menus () {
global $menu;
	$restricted = array(__('Dashboard'), /*__('Tools'),*/);
	end ($menu);
	while (prev($menu)){
		$value = explode(' ',$menu[key($menu)][0]);
		if(in_array($value[0] != NULL?$value[0]:"" , $restricted)){unset($menu[key($menu)]);}
	}
}
add_action('admin_menu', 'remove_menus');


// Changing WordPress admin Menu Names
function change_post_menu_label() {
    global $menu;
    global $submenu;
    $menu[5][0] = 'What\'s New Blog';
    $submenu['edit.php'][5][0] = 'What\'s New Blog';
    $submenu['edit.php'][10][0] = 'Add a Blog Post';
   // $submenu['edit.php'][15][0] = 'Status'; // Change name for categories
    //$submenu['edit.php'][16][0] = 'Labels'; // Change name for tags
    echo '';
}

function change_post_object_label() {
        global $wp_post_types;
        $labels = &$wp_post_types['post']->labels;
        $labels->name = 'Blog Posts';
        $labels->singular_name = 'Blog Posts';
        $labels->add_new = 'Add a Blog Post';
        $labels->add_new_item = 'Add a Blog Post';
        $labels->edit_item = 'Edit Blog Posts';
        $labels->new_item = 'Blog Posts';
        $labels->view_item = 'View Blog Posts';
        $labels->search_items = 'Search Blog Posts';
        $labels->not_found = 'No Blog Posts found';
        $labels->not_found_in_trash = 'No Blog Posts found in Trash';
    }
    add_action( 'init', 'change_post_object_label' );
    add_action( 'admin_menu', 'change_post_menu_label' );
?>
<?php
// if you need to deregister styles in plugins
/*add_action( 'wp_print_styles', 'my_deregister_styles', 100 );

function my_deregister_styles() {
	wp_deregister_style( 'soliloquy-style' );
}*/
?>
<?php 

/* Custom Post Types */

add_action('init', 'js_custom_init');
function js_custom_init() 
{

  
  
  // Register the Projects ... 
  
   $labels = array(
	'name' => _x('All Projects', 'post type general name'),
    'singular_name' => _x('All Projects', 'post type singular name'),
    'add_new' => _x('Add New', 'Projects'),
    'add_new_item' => __('Add New Project'),
    'edit_item' => __('Edit Project'),
    'new_item' => __('New Project'),
    'view_item' => __('View Project'),
    'search_items' => __('Search Projects'),
    'not_found' =>  __('No Projects found'),
    'not_found_in_trash' => __('No Projects found in Trash'), 
    'parent_item_colon' => '',
    'menu_name' => 'All Projects'
  );
  $args = array(
	'labels' => $labels,
    'public' => true,
    'publicly_queryable' => true,
    'show_ui' => true, 
    'show_in_menu' => true, 
    'query_var' => true,
    'rewrite' => true,
    'capability_type' => 'post',
    'has_archive' => false, 
    'hierarchical' => false,
    'menu_position' => 17,
    'supports' => array('title','editor','custom-fields','thumbnail'),
	
  ); 
  register_post_type('projects',$args);
  
  
  
  // Register the Optima University
  
     $labels = array(
	'name' => _x('Events', 'post type general name'),
    'singular_name' => _x('Events', 'post type singular name'),
    'add_new' => _x('Add New', 'Events'),
    'add_new_item' => __('Add New Events'),
    'edit_item' => __('Edit Events'),
    'new_item' => __('New Events'),
    'view_item' => __('View Events'),
    'search_items' => __('Search Events'),
    'not_found' =>  __('No Events found'),
    'not_found_in_trash' => __('No Events found in Trash'), 
    'parent_item_colon' => '',
    'menu_name' => 'Optima University Events'
  );
  $args = array(
	'labels' => $labels,
    'public' => true,
    'publicly_queryable' => true,
    'show_ui' => true, 
    'show_in_menu' => true, 
    'query_var' => true,
    'rewrite' => true,
    'capability_type' => 'post',
    'has_archive' => false, 
    'hierarchical' => false,
    'menu_position' => 22,
    'supports' => array('title','editor','custom-fields','thumbnail'),
	
  ); 
  register_post_type('events',$args);


  
  
  
 
  
    
}


// WP Menu Categories
add_action( 'init', 'build_taxonomies', 0 );
// Add some custom categories to the  post type 
function build_taxonomies() {
    register_taxonomy( 'categories', 'projects',
	 array( 
	'hierarchical' => true, 
	'label' => 'View by Category', 
	'query_var' => true, 
	'rewrite' => array( 'slug' => 'project-categories' ),
	'show_admin_column' => true,
	
	) );
	
	
	//Expertise
	register_taxonomy( 'expertise', 'projects',
	 array( 
	'hierarchical' => false, 
	'label' => 'Expertise', 
	'query_var' => true, 
	'rewrite' => array( 'slug' => 'expertise' ),
	'show_admin_column' => true,
	) );
	
	
	//Sustainable Features
	register_taxonomy( 'sustainablefeatures', 'projects',
	 array( 
	'hierarchical' => false, 
	'label' => 'Sustainable Features', 
	'query_var' => true, 
	'rewrite' => array( 'slug' => 'sustainable-features' ),
	'show_admin_column' => false,
	) );
	
	// For showing on Front Page and we'll call it the "Hero" Project	
register_taxonomy( 'hero',
      array( 
	  'projects' ), // List Custom Post Types to show
      array( 
	  'hierarchical' => true,
      'label' => 'Make this a Hero Project?',               
      'query_var' => true,
	  'show_admin_column' => true,
	  'public' => true,
	 
      )
   );
	
	
	
	// For showing A featured Event
register_taxonomy( 'featured',
      array( 
	  'events' ), // List Custom Post Types to show
      array( 
	  'hierarchical' => true,
      'label' => 'Feature this Event?',               
      'query_var' => true,
	  'show_admin_column' => true,
      )
   );
	
	
} // build taxonomies

add_action( 'admin_menu', 'register_my_custom_menu_page' );
function register_my_custom_menu_page(){
add_menu_page( 'Expertise', 'Expertise', 'manage_options', 'edit-tags.php?taxonomy=expertise&post_type=projects', '', '', 18 );
add_menu_page( 'Sustainable Features', 'Sustainable Features', 'manage_options', 'edit-tags.php?taxonomy=sustainablefeatures&post_type=projects', '', '', 19 );
}

add_action('admin_menu', 'remove_niggly_bits');
function remove_niggly_bits() {
    global $submenu;
    unset($submenu['edit.php?post_type=projects'][18]); // Remove, "Is this a Hero Project
	unset($submenu['edit.php?post_type=projects'][17]); // Remove, "Sustainable Features
	unset($submenu['edit.php?post_type=projects'][16]); // Remove, "Expertise
	unset($submenu['edit.php?post_type=events'][15]); // Remove, "Feature this event
   // print_r($submenu); exit;
}




//hook to save the meta box data
add_action( 'save_post', 'c3m_mbe_save_meta' );
function c3m_mbe_save_meta( $post_ID ) {
    global $post;
    if( $post->post_type == "events" ) {
    if ( isset( $_POST ) ) {
        update_post_meta( $post_ID, '_c3m_mbe_featured', strip_tags( $_POST['c3m_mbe_featured'] ) );
    }
}

}

// Disable canonical redirects on the event so we can paginate  a single post view.
add_filter('redirect_canonical','pif_disable_redirect_canonical');

function pif_disable_redirect_canonical($redirect_url) {
if (is_singular('events')) $redirect_url = false;
return $redirect_url;
}

// Register some nav menus
function register_my_menu() {
  register_nav_menu('header-menu',__( 'Header Menu' ));
}
add_action( 'init', 'register_my_menu' );


?>
<?php 
// --------------  Register Widget Menus -------------- 
function bw_register_sidebars(){
	register_sidebar( array (
		'name' => 'Page Sidebar',
		'id' => 'page-sidebar',
		'description' => __( 'The sidebar on basic pages'),
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget' => "</div>",
		'before_title' => '<h3 class="widget-title">',
		'after_title' => '</h3>',
	) );
	register_sidebar( array (
		'name' => "Homepage Widget",
		'id' => 'home-widget',
		'description' => __( 'widget for the homepage'),
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget' => "</div>",
		'before_title' => '<h3 class="widget-title">',
		'after_title' => '</h3>',
	) );
	register_sidebar( array (
		'name' => "Homepage Footer",
		'id' => 'home-footer',
		'description' => __( 'homepage footer.'),
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget' => "</div>",
		'before_title' => '<h3 class="widget-title">',
		'after_title' => '</h3>',
	) );
	
	// add more above this line
}// Ends add widgets
add_action( 'widgets_init', 'bw_register_sidebars' );
?>
<?php
/*
Plugin Name: Page Excerpt

Description: Adds support for page excerpts - uses WordPress code

*/
add_action( 'edit_page_form', 'pe_add_box');
add_action('init', 'pe_init');
function pe_init() {
	if(function_exists("add_post_type_support")) //support 3.1 and greater
	{add_post_type_support( 'page', 'excerpt' );}
}
function pe_page_excerpt_meta_box($post) {
?>
<label class="hidden" for="excerpt"><?php _e('Excerpt hey') ?></label><textarea rows="1" cols="40" name="excerpt" tabindex="6" id="excerpt"><?php echo $post->post_excerpt ?></textarea>
<p><?php _e('Excerpt go here..........'); ?></p>
<?php
}
function pe_add_box()
{
	if(!function_exists("add_post_type_support")) //legacy
	{		add_meta_box('postexcerpt', __('Page Excerpt'), 'pe_page_excerpt_meta_box', 'page', 'advanced', 'core');}
}

?>
<?php  // Limit the excerpt without truncating the last word.
// use like this > echo get_excerpt(100);
function get_excerpt($count){
  $permalink = get_permalink($post->ID);
  $excerpt = get_the_content();
  $excerpt = strip_tags($excerpt);
  $excerpt = substr($excerpt, 0, $count);
  $excerpt = $excerpt.'... continue reading';
  return $excerpt;
}
?>
<?php
function query_post_type($query) {
    $post_types = get_post_types();

    if ( is_category() || is_tag()) {

        $post_type = get_query_var('projects');

        if ( $post_type ) {
            $post_type = $post_type;
        } else {
            $post_type = $post_types;
        }

        $query->set('post_type', $post_type);

        return $query;
    }
}

add_filter('pre_get_posts', 'query_post_type');
?>
<?php 
// Custom Bellaworks Pagination Function
/* 
		Use in your template like this: 
		
		<?php bellaworks_pagi_nav(); ?>


*/
function bellaworks_pagi_nav() {

	if( is_singular() )
		return;

	global $wp_query;

	/** Stop execution if there's only 1 page */
	if( $wp_query->max_num_pages <= 1 )
		return;

	$paged = get_query_var( 'paged' ) ? absint( get_query_var( 'paged' ) ) : 1;
	$max   = intval( $wp_query->max_num_pages );

	/**	Add current page to the array */
	if ( $paged >= 1 )
		$links[] = $paged;

	/**	Add the pages around the current page to the array */
	if ( $paged >= 3 ) {
		$links[] = $paged - 1;
		$links[] = $paged - 2;
	}

	if ( ( $paged + 2 ) <= $max ) {
		$links[] = $paged + 2;
		$links[] = $paged + 1;
	}

	echo '<div class="pavigation"><ul>' . "\n";

	/**	Previous Post Link */
	if ( get_previous_posts_link() )
		printf( '<li>%s</li>' . "\n", get_previous_posts_link() );

	/**	Link to first page, plus ellipses if necessary */
	if ( ! in_array( 1, $links ) ) {
		$class = 1 == $paged ? ' class="active"' : '';

		printf( '<li%s><a href="%s">%s</a></li>' . "\n", $class, esc_url( get_pagenum_link( 1 ) ), '1' );

		if ( ! in_array( 2, $links ) )
			echo '<li>…</li>';
	}

	/**	Link to current page, plus 2 pages in either direction if necessary */
	sort( $links );
	foreach ( (array) $links as $link ) {
		$class = $paged == $link ? ' class="active"' : '';
		printf( '<li%s><a href="%s">%s</a></li>' . "\n", $class, esc_url( get_pagenum_link( $link ) ), $link );
	}

	/**	Link to last page, plus ellipses if necessary */
	if ( ! in_array( $max, $links ) ) {
		if ( ! in_array( $max - 1, $links ) )
			echo '<li>…</li>' . "\n";

		$class = $paged == $max ? ' class="active"' : '';
		printf( '<li%s><a href="%s">%s</a></li>' . "\n", $class, esc_url( get_pagenum_link( $max ) ), $max );
	}

	/**	Next Post Link */
	if ( get_next_posts_link() )
		printf( '<li>%s</li>' . "\n", get_next_posts_link() );

	echo '</ul></div>' . "\n";

}
?>
<?php 
class Walker_Page_Comma_Separated_List extends Walker {
	var $tree_type = 'page';
	var $db_fields = array ('parent' => 'post_parent', 'id' => 'ID');
	var $separator = ', ';
	var $el_count = 1;
	function start_lvl(&$output, $depth) {
		$output .= "<p>\n";
	}
	function end_lvl(&$output, $depth) {
		$output .= "</p>\n";
	}
	function start_el( &$output, $page, $depth, $args, $current_page ) {
		$output.= ( $this->el_count > 1 ) ? $this->separator : '';
		$this->el_count++;
		extract($args, EXTR_SKIP);
		$href = get_page_link( $page->ID );
		$title = apply_filters( 'the_title', $page->post_title );
		$output .= '<a href="' . $href . '" title="' . esc_attr( $title ) . '">' . $link_before . $title . $link_after . '</a>';
	}
	function end_el( &$output, $page, $depth ) {
		$output .= '';
	}
}
?>
<?php
//
// Custom login function 
//
function custom_login_logo() {
        echo '<style type="text/css">h1 a { background: url('.get_bloginfo('template_directory').'/images/login-logo.png) 50% 50% no-repeat !important; }</style>';
}
add_action('login_head', 'custom_login_logo'); 

function my_login_logo_url() {
    return get_bloginfo( 'url' );
}
add_filter( 'login_headerurl', 'my_login_logo_url' );

function my_login_logo_url_title() {
    return 'Jack Baker Real Estate';
}
add_filter( 'login_headertitle', 'my_login_logo_url_title' ); 
?>