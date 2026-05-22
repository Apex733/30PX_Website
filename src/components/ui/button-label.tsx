import * as React from "react"

function flattenChildren(children: React.ReactNode): React.ReactNode[] {
    return React.Children.toArray(children).flatMap((child) => {
        if (React.isValidElement(child) && child.type === React.Fragment) {
            return flattenChildren(child.props.children)
        }

        return [child]
    })
}

function isTextNode(node: React.ReactNode): node is string | number {
    return typeof node === "string" || typeof node === "number"
}

export function ButtonLabel({ children }: { children: React.ReactNode }) {
    const nodes = flattenChildren(children)
    const firstTextIndex = nodes.findIndex((node) => isTextNode(node) && String(node).trim().length > 0)
    const lastTextIndex = [...nodes]
        .reverse()
        .findIndex((node) => isTextNode(node) && String(node).trim().length > 0)

    if (firstTextIndex === -1 || lastTextIndex === -1) {
        return <>{children}</>
    }

    const trailingIndex = nodes.length - 1 - lastTextIndex
    const leadingNodes = nodes.slice(0, firstTextIndex)
    const trailingNodes = nodes.slice(trailingIndex + 1)
    const label = nodes
        .slice(firstTextIndex, trailingIndex + 1)
        .filter(isTextNode)
        .map((node) => String(node))
        .join(" ")
        .replace(/\s+/g, " ")
        .trim()

    if (!label) {
        return <>{children}</>
    }

    return (
        <>
            {leadingNodes}
            <span className="relative block h-[1.1em] overflow-hidden leading-none">
                <span className="flex flex-col will-change-transform transition-transform duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover/button:-translate-y-1/2 group-focus-visible/button:-translate-y-1/2 motion-reduce:transform-none motion-reduce:transition-none">
                    <span className="block whitespace-nowrap">{label}</span>
                    <span aria-hidden="true" className="block whitespace-nowrap">
                        {label}
                    </span>
                </span>
            </span>
            {trailingNodes}
        </>
    )
}
