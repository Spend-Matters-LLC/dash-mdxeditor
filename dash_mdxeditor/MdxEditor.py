# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class MdxEditor(Component):
    """A MdxEditor component.
MdxEditor is a markdown editor that allows to preview the markdown content and edit
as rich text.

Keyword arguments:

- id (string; optional):
    The ID used to identify this component in Dash callbacks.

- default_text (string; optional):
    The initial text of the editor.

- text (string; optional):
    The text of the editor (read)."""
    _children_props = []
    _base_nodes = ['children']
    _namespace = 'dash_mdxeditor'
    _type = 'MdxEditor'
    @_explicitize_args
    def __init__(self, id=Component.UNDEFINED, default_text=Component.UNDEFINED, text=Component.UNDEFINED, **kwargs):
        self._prop_names = ['id', 'default_text', 'text']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['id', 'default_text', 'text']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args}

        super(MdxEditor, self).__init__(**args)
