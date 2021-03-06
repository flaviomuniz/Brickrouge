<?php

/*
 * This file is part of the Brickrouge package.
 *
 * (c) Olivier Laviale <olivier.laviale@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Brickrouge;

/**
 * A `<FIELDSET>` element with an optional `<LEGEND>` element.
 *
 * The direct children of the element are wrapped in a `DIV.field` element, see the
 * {@link render_child()} method for more information.
 *
 * Localization:
 *
 * - Labels defined using the {@link Form::LABEL} attribute are translated within the
 * 'group.label|element.label' scope.
 * - Legends defined using the {@link LEGEND} attribute are translated within the 'group.legend'
 * scope.
 */
class Group extends Element
{
	const LABEL = '#form-label';

	/**
	 * Creates a `<FIELDSET.group>` element.
	 *
	 * @param array $attributes
	 *
	 * @see Element::__construct()
	 */
	public function __construct(array $attributes=array())
	{
		parent::__construct('fieldset', $attributes + array('class' => 'group'));
	}

	/**
	 * Adds the `no-legend` class name if the group has no legend (the {@link LEGEND} attribute
	 * is empty).
	 *
	 * @see Element::render_class()
	 */
	protected function render_class(array $class_names)
	{
		if (!$this[self::LEGEND])
		{
			$class_names['no-legend'] = true;
		}

		return parent::render_class($class_names);
	}

	/**
	 * Override the method to render the child in a `<DIV.field>` wrapper:
	 *
	 * <div class="field [{normalized_field_name}][required]">
	 *     [<label for="{element_id}" class="input-label [required]">{element_form_label}</label>]
	 *     <div class="input">{child}</div>
	 * </div>
	 *
	 * @see Element::render_child()
	 */
	protected function render_child($child)
	{
		$control_group_class = 'control-group';

		$name = $child['name'];

		if ($name)
		{
			$control_group_class .= ' control-group--' . normalize($name);
		}

		if ($child[self::REQUIRED])
		{
			$control_group_class .= ' required';
		}

		$state = $child[Element::STATE];

		if ($state)
		{
			$control_group_class .= ' ' . $state;
		}

		$label = $child[Form::LABEL];

		if ($label)
		{
			if (!($label instanceof Element))
			{
				$label = escape(t
				(
					$label, array(), array
					(
						'scope' => 'group.label',
						'default' => function($label)
						{
							return t($label, array(), array('scope' => 'element.label'));
						}
					)
				));
			}

			$label = '<label for="' . $child->id . '" class="controls-label">' . $label . '</label>' . PHP_EOL;
		}

		return <<<EOT
<div class="$control_group_class">
	$label<div class="controls">$child</div>
</div>
EOT;
	}

	/**
	 * Prepends the inner HTML with a description and a legend.
	 *
	 * If the {@link DESCRIPTION} attribute is defined the HTML is prepend with a
	 * `DIV.group-description>DIV.group-description-inner` element. The description is translated
	 * within the "group.description" scope. The description is not escaped.
	 *
	 * If the {@link LEGEND} attribute is defined the HTML is prenpend with a `<LEGEND>` element.
	 * The legend can be provided as an object in which it is used _as is_, otherwise the legend
	 * is translated within the "group.legend" scope, then escaped.
	 *
	 * The legend element is rendered using the {@link render_group_legend()} method.
	 *
	 * @see Element::render_inner_html()
	 */
	protected function render_inner_html()
	{
		$html = parent::render_inner_html();

		$description = $this[self::DESCRIPTION];

		if ($description)
		{
			$description = t($description, array(), array('scope' => 'group.description'));
			$html = '<div class="group-description"><div class="group-description-inner">' . $description . '</div></div>' . $html;
		}

		$legend = $this[self::LEGEND];

		if ($legend)
		{
			if (is_object($legend))
			{
				$legend = (string) $legend;
			}
			else
			{
				$legend = escape(t($legend, array(), array('scope' => 'group.legend')));
			}

			$html = $this->render_group_legend($legend) . $html;
		}

		return $html;
	}

	/**
	 * Renders the group legend.
	 *
	 * @param string $legend The legend to render.
	 *
	 * @return string a `<LEGEND.group-legend>` HTML element.
	 */
	protected function render_group_legend($legend)
	{
		return '<legend class="group-legend">' . $legend . '</legend>';
	}

	/**
	 * The description decoration is disabled because the {@link DESCRIPTION} attribute is rendered
	 * by the {@link render_inner_html()} method to prepend the inner HTML.
	 *
	 * @see Element::decorate_with_legend()
	 */
	protected function decorate_with_description($html, $description)
	{
		return $html;
	}

	/**
	 * The legend decoration is disabled because the {@link LEGEND} attribute is rendered
	 * by the {@link render_inner_html()} method to prepend the inner HTML.
	 *
	 * @see Element::decorate_with_legend()
	 */
	protected function decorate_with_legend($html, $legend)
	{
		return $html;
	}
}