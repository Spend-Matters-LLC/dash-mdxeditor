import dash_mdxeditor as dme
from dash import Dash, callback, html, Input

app = Dash(__name__)

default_text = "# Hello World! \n## This is a subtitle\nThis is a **normal** text\n- Item 1\n- Item 2\n"

app.layout = html.Div([
    dme.MdxEditor(
        id='mdx-editor',
        default_text=default_text,
    ),
])


@callback(Input('mdx-editor', 'text'))
def display_output(text: str):
    print(text)


if __name__ == '__main__':
    app.run_server(debug=True)
