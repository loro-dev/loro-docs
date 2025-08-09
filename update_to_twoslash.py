#!/usr/bin/env python3
import re

# Read the file
with open('/home/ec2-user/loro-docs/pages/docs/api/js.mdx', 'r') as f:
    content = f.read()

# Pattern to match code blocks within Example sections
# This looks for ```typescript blocks that come after **Example:** but before the next </Method> or </Indent>
pattern = r'(\*\*Example:\*\*\s*\n```)(typescript)(.*?```)'

def replace_example_typescript(match):
    # Only replace if this is in an Example context
    return match.group(1) + 'ts twoslash' + match.group(3)

# Replace all typescript in examples with ts twoslash
content = re.sub(pattern, replace_example_typescript, content, flags=re.DOTALL)

# Write the updated content
with open('/home/ec2-user/loro-docs/pages/docs/api/js.mdx', 'w') as f:
    f.write(content)

print("Updated all example code blocks to use 'ts twoslash'")