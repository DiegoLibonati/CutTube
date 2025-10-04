from pydantic import BaseModel, constr


class ClipModel(BaseModel):
    url: constr(min_length=1, strip_whitespace=True)
    start: constr(min_length=1, strip_whitespace=True)
    end: constr(min_length=1, strip_whitespace=True)
    filename: constr(min_length=1, strip_whitespace=True)
