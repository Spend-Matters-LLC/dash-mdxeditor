# AUTO GENERATED FILE - DO NOT EDIT

export dme_mdxeditor

"""
    dme_mdxeditor(;kwargs...)

A MdxEditor component.
MdxEditor is a markdown editor that allows to preview the markdown content and edit
as rich text.
Keyword arguments:
- `id` (String; optional): The ID used to identify this component in Dash callbacks.
- `default_text` (String; optional): The initial text of the editor
- `text` (String; optional): The text of the editor (read)
"""
function dme_mdxeditor(; kwargs...)
        available_props = Symbol[:id, :default_text, :text]
        wild_props = Symbol[]
        return Component("dme_mdxeditor", "MdxEditor", "dash_mdxeditor", available_props, wild_props; kwargs...)
end

