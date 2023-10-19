# GENERATE A COMPONENT

#? src/<path>/<directory_name>/<yourcomponent>

#? USAGE

#* bash grc.sh {path} {directory_name} {yourcomponent}

#* $1 = path - should be lowercase can contain / for sub directories
#* $1 = directory_name - should be lowercase directory name
#* $2 = component - should be capital/camelcase inline with react component 

#? can be used for components, screens, navigators etc


# create directory & empty file structure in src/<path>

mkdir src/$1/$2 # make new directory 
touch src/$1/$2/$3.tsx # make component.tsx
touch src/$1/$2/index.ts # make index.ts




# ----- component.tsx ------ create starter functional component

echo "import React from 'react';
import { View } from 'react-native';
import tw from 'theme/tailwind';

type Props = {};

const ${3}: React.FC<Props> = (props) => {
  return <View>${3}</View>;
};

export default ${3}; " >  src/$1/$2/$3.tsx



# # ------ index.ts ------- create default export 

echo "import ${3} from './${3}';

export { ${3} }" >  src/$1/$2/index.ts



