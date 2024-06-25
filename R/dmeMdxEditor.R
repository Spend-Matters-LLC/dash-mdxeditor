# AUTO GENERATED FILE - DO NOT EDIT

#' @export
dmeMdxEditor <- function(id=NULL, default_text=NULL, text=NULL) {
    
    props <- list(id=id, default_text=default_text, text=text)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'MdxEditor',
        namespace = 'dash_mdxeditor',
        propNames = c('id', 'default_text', 'text'),
        package = 'dashMdxeditor'
        )

    structure(component, class = c('dash_component', 'list'))
}
