import {
  AdmonitionDirectiveDescriptor,
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  ChangeAdmonitionType,
  ConditionalContents,
  CreateLink,
  diffSourcePlugin,
  DiffSourceToggleWrapper,
  DirectiveNode,
  directivesPlugin,
  EditorInFocus,
  headingsPlugin,
  InsertAdmonition,
  InsertTable,
  InsertThematicBreak,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  ListsToggle,
  MDXEditor,
  quotePlugin,
  Separator,
  StrikeThroughSupSubToggles,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
} from "@mdxeditor/editor"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from "react"


import "@mdxeditor/editor/style.css"

export interface MdxEditorProps {
  /**
   * The ID used to identify this component in Dash callbacks.
   */
  id?: string
  /**
   * The initial text of the editor
   */
  default_text?: string
  /**
   * The text of the editor (read)
   */
  text?: string
  /**
   * Dash-assigned callback that should be called to report property changes
   * to Dash, to make them available for callbacks.
   */
  setProps: (props: Partial<MdxEditorProps>) => void
}

/**
 * MdxEditor is a markdown editor that allows to preview the markdown content and edit
 * as rich text.
 */
const MdxEditor = ({ default_text = "", setProps }: MdxEditorProps) => {
  function whenInAdmonition(editorInFocus: EditorInFocus | null) {
    const node = editorInFocus?.rootNode
    if (!node || node.getType() !== "directive") {
      return false
    }

    return ["note", "tip", "danger", "info", "caution"].includes(
      (node as DirectiveNode).getMdastNode().name
    )
  }

  if (React.version.startsWith("16")) {
    return <div>Please set React 18 to use this component (you can set the env var REACT_VERSION=18.2.0)</div>
  }

  return (
    <MDXEditor
      markdown={default_text}
      onChange={(text) => setProps({ text: text })}
      plugins={[
        listsPlugin(),
        quotePlugin(),
        headingsPlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        tablePlugin(),
        thematicBreakPlugin(),
        diffSourcePlugin(),
        directivesPlugin({ directiveDescriptors: [AdmonitionDirectiveDescriptor] }),
        toolbarPlugin({
          toolbarContents: () => (
            <DiffSourceToggleWrapper options={["rich-text", "source"]}>
              <UndoRedo />
              <Separator />
              <BoldItalicUnderlineToggles />
              <Separator />
              <StrikeThroughSupSubToggles />
              <Separator />
              <ListsToggle />
              <Separator />
              <ConditionalContents
                options={[
                  { when: whenInAdmonition, contents: () => <ChangeAdmonitionType /> },
                  { fallback: () => <BlockTypeSelect /> },
                ]}
              />
              <Separator />
              <CreateLink />
              <InsertTable />
              <InsertThematicBreak />
              <ConditionalContents
                options={[
                  {
                    when: (editorInFocus) => !whenInAdmonition(editorInFocus),
                    contents: () => (
                      <>
                        <Separator />
                        <InsertAdmonition />
                      </>
                    ),
                  },
                ]}
              />
            </DiffSourceToggleWrapper>
          ),
        }),
      ]}
    />
  )
}

export default MdxEditor
