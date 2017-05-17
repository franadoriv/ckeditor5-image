/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/**
 * @module image/imagecaption/utils
 */

import ModelElement from '@ckeditor/ckeditor5-engine/src/model/element';
import ViewEditableElement from '@ckeditor/ckeditor5-engine/src/view/editableelement';
import { attachPlaceholder } from '@ckeditor/ckeditor5-engine/src/view/placeholder';
import { toWidgetEditable } from '@ckeditor/ckeditor5-widget/src/utils';

const captionSymbol = Symbol( 'imageCaption' );

/**
 * Returns a function that creates caption editable element for the given {@link module:engine/view/document~Document}.
 *
 * @param {module:engine/view/document~Document} viewDocument
 * @param {String} placeholderText Text to be displayed when caption is empty.
 * @return {Function}
 */
export function captionElementCreator( viewDocument, placeholderText ) {
	return () => {
		const editable = new ViewEditableElement( 'figcaption' );
		editable.document = viewDocument;
		editable.setCustomProperty( captionSymbol, true );
		attachPlaceholder( editable, placeholderText );

		return toWidgetEditable( editable );
	};
}

/**
 * Returns `true` if given view element is image's caption editable.
 *
 * @param {module:engine/view/element~Element} viewElement
 * @return {Boolean}
 */
export function isCaption( viewElement ) {
	return !!viewElement.getCustomProperty( captionSymbol );
}

/**
 * Returns caption model element from given image element. Returns `null` if no caption is found.
 *
 * @param {module:engine/model/element~Element} imageModelElement
 * @return {module:engine/model/element~Element|null}
 */
export function getCaptionFromImage( imageModelElement ) {
	for ( const node of imageModelElement.getChildren() ) {
		if ( node instanceof ModelElement && node.name == 'caption' ) {
			return node;
		}
	}

	return null;
}

/**
 * {@link module:engine/view/matcher~Matcher} pattern. Checks if given element is `figcaption` element and is placed
 * inside image `figure` element.
 *
 * @param {module:engine/view/element~Element} element
 * @returns {Object|null} Returns object accepted by {@link module:engine/view/matcher~Matcher} or `null` if element
 * cannot be matched.
 */
export function matchImageCaption( element ) {
	const parent = element.parent;

	// Convert only captions for images.
	if ( element.name == 'figcaption' && parent && parent.name == 'figure' && parent.hasClass( 'image' ) ) {
		return { name: true };
	}

	return null;
}
