# AUTO GENERATED FILE - DO NOT EDIT

#' @export
dmeMdxEditor <- function(id=NULL, label=NULL, value=NULL) {
    
    props <- list(id=id, label=label, value=value)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'MdxEditor',
        namespace = 'dash_mdxeditor',
        propNames = c('id', 'label', 'value'),
        package = 'dashMdxeditor'
        )

    structure(component, class = c('dash_component', 'list'))
}
