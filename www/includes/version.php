<?php
/**
* @version $Id: version.php 10052 2008-02-21 16:04:13Z willebil $
* @package Joomla / Tradu��o JoomlaClube 2008 - www.joomlaclube.com.br
* @copyright Copyright (C) 2005 Open Source Matters. All rights reserved.
* @license http://www.gnu.org/copyleft/gpl.html GNU/GPL, see LICENSE.php
* Joomla! is free software. This version may have been modified pursuant
* to the GNU General Public License, and as distributed it includes or
* is derivative of works licensed under the GNU General Public License or
* other free or open source software licenses.
* See COPYRIGHT.php for copyright notices and details.
*/

// no direct access
defined( '_VALID_MOS' ) or die( 'Restricted access' );

/**
 * Version information
 * @package Joomla
 */
class joomlaVersion {
	/** @var string Product */
	var $PRODUCT 	= 'Joomla!';
	/** @var int Main Release Level */
	var $RELEASE 	= '1.0';
	/** @var string Development Status */
	var $DEV_STATUS = 'Est�vel JoomlaClube PT-BR';
	/** @var int Sub Release Level */
	var $DEV_LEVEL 	= '15';
	/** @var int build Number */
	var $BUILD	 	= '$Revision: 10052 $';
	/** @var string Codename */
	var $CODENAME 	= 'Daytime';
	/** @var string Date */
	var $RELDATE 	= '22 February 2008';
	/** @var string Time */
	var $RELTIME 	= '23:00';
	/** @var string Timezone */
	var $RELTZ 		= 'UTC';
	/** @var string Copyright Text */
	var $COPYRIGHT 	= "Copyright (C) 2005 - 2007 Open Source Matters. All rights reserved.";
	/** @var string URL */
	var $URL 		= '<a href="http://www.joomlaclube.org">JoomlaClube</a> - Comunidade do Joomla no Brasil<br><a href="http://www.joomla.org">Joomla!</a> � um software livre disponibilizado sob licen�a GNU/GPL.';
	/** @var string Whether site is a production = 1 or demo site = 0: 1 is default */
	var $SITE 		= 1;
	/** @var string Whether site has restricted functionality mostly used for demo sites: 0 is default */
	var $RESTRICT	= 0;
	/** @var string Whether site is still in development phase (disables checks for /installation folder) - should be set to 0 for package release: 0 is default */
	var $SVN		= 0;


	/**
	 * @return string Long format version
	 */
	function getLongVersion() {
		return $this->PRODUCT .' '. $this->RELEASE .'.'. $this->DEV_LEVEL .' '
			. $this->DEV_STATUS
			.' [ '.$this->CODENAME .' ] '. $this->RELDATE .' '
			. $this->RELTIME .' '. $this->RELTZ;
	}

	/**
	 * @return string Short version format
	 */
	function getShortVersion() {
		return $this->RELEASE .'.'. $this->DEV_LEVEL;
	}

	/**
	 * @return string Version suffix for help files
	 */
	function getHelpVersion() {
		if ($this->RELEASE > '1.0') {
			return '.' . str_replace( '.', '', $this->RELEASE );
		} else {
			return '';
		}
	}
}
$_VERSION = new joomlaVersion();

$version = $_VERSION->PRODUCT .' '. $_VERSION->RELEASE .'.'. $_VERSION->DEV_LEVEL .' '
. $_VERSION->DEV_STATUS
.' [ '.$_VERSION->CODENAME .' ] '. $_VERSION->RELDATE .' '
. $_VERSION->RELTIME .' '. $_VERSION->RELTZ;
?>
